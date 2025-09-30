import { server } from "../../config";
import type { NextApiRequest, NextApiResponse } from "next";
import fs from "fs/promises";
import path from "path";
import type { download as downloadType } from "../../public/types";

type ResponseData = downloadType | { error: string };

// Path to cache file
const CACHE_FILE = path.join(process.cwd(), "cache", "download.json");

// Ensure cache directory exists
async function ensureCacheDirectory() {
  const cacheDir = path.join(process.cwd(), "cache");
  try {
    await fs.mkdir(cacheDir, { recursive: true });
  } catch (error) {
    console.error("Error creating cache directory:", error);
  }
}

// Read cached data
async function getCachedData(): Promise<downloadType | null> {
  try {
    const data = await fs.readFile(CACHE_FILE, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Error reading cache:", error);
    return null;
  }
}

// Write data to cache
async function cacheData(data: downloadType) {
  try {
    await fs.writeFile(CACHE_FILE, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error("Error writing to cache:", error);
  }
}

async function fetchData() {
  try {
    const response = await fetch(`${server}/api/download/all`, {
      signal: AbortSignal.timeout(5000),
    });

    // Check if response is JSON
    const contentType = response.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
      const text = await response.text();
      throw new Error(`Response is not JSON: ${text.slice(0, 100)}`);
    }

    if (!response.ok) {
      throw new Error(`Fetch failed with status: ${response.status}`);
    }

    return response;
  } catch (error: any) {
    console.error("Fetch error:", error);
  }
}

export async function download() {
  try {
    const response: any = await fetchData();
    const jsonData: downloadType = await response.json();
    return jsonData;
  } catch (error: any) {
    const cachedData = await getCachedData();
    if (cachedData) {
      console.log({ error: "Using cached data" });
      return cachedData;
    } else {
      console.log({ error: "Service unavailable, no cached data available" });
    }
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>,
) {
  await ensureCacheDirectory();

  try {
    const response: any = await fetchData();
    const jsonData: downloadType = await response.json();

    // Update cache with new data
    await cacheData(jsonData);

    res.status(200).json({ error: "Status OK" });
  } catch (error: any) {
    // Fall back to cached data
    const cachedData = await getCachedData();
    if (cachedData) {
      res.status(200).json({ error: "Using cached data" });
    } else {
      res
        .status(503)
        .json({ error: "Service unavailable, no cached data available" });
    }
  }
}
