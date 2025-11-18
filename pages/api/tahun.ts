import { server } from "../../config";
import type { NextApiRequest, NextApiResponse } from "next";
import fs from "fs/promises";
import path from "path";
import type { tahun as tahunType } from "../../public/types";

const UPSTREAM = `${server}/api/tahun`;
const COOKIE = process.env.COOKIE || "";
const CACHE_FILE = path.join(process.cwd(), "cache", "tahun.json");

let memCache: { data: any; ts: number } | null = null;

async function ensureCache() {
  await fs.mkdir(path.dirname(CACHE_FILE), { recursive: true }).catch(() => {});
}

async function getCache() {
  try {
    const raw = await fs.readFile(CACHE_FILE, "utf-8");
    const data = JSON.parse(raw);
    memCache = { data, ts: Date.now() };
    return data;
  } catch {
    return null;
  }
}

async function saveCache(data: any) {
  try {
    await ensureCache();
    await fs.writeFile(CACHE_FILE, JSON.stringify(data, null, 2));
    memCache = { data, ts: Date.now() };
  } catch (e) {
    console.error("Cache save failed:", e);
  }
}

async function fetchFresh() {
  if (!COOKIE) throw new Error("COOKIE not set");

  const res = await fetch(UPSTREAM, {
    headers: {
      Cookie: COOKIE,
      "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
      Accept: "application/json",
    },
  });

  const text = await res.text();

  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  if (text.includes("<html")) throw new Error("Cloudflare block");

  return text;
}

export async function tahun() {
  try {
    const response: any = await fetchFresh();
    const jsonData: tahunType = await JSON.parse(response);
    return jsonData;
  } catch (error: any) {
    const cachedData = await getCache();
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
  res: NextApiResponse<any>
) {
  // Memory cache
  if (memCache && Date.now() - memCache.ts < 60 * 60 * 1000) {
    return res.status(200).json(memCache.data);
  }

  // Disk cache
  const disk = await getCache();
  if (disk) return res.status(200).json(disk);

  // Fresh
  try {
    const data = await fetchFresh();
    await saveCache(data);
    res.status(200).json(data);
  } catch (err: any) {
    console.error("Fetch failed:", err.message);
    const fallback = await getCache();
    if (fallback) res.status(503).json(fallback);
    else res.status(503).json({ error: "Service unavailable" });
  }
}
