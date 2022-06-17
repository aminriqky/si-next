import { server } from "../../config";
import type { NextApiRequest, NextApiResponse } from "next";
import type { berita as beritaType } from "../../public/types";

export async function berita() {
  const response = await fetch(`${server}/api/berita/all`);
  const jsonData: beritaType = await response.json();
  return jsonData;
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json("Status OK");
}
