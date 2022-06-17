import { server } from "../../config";
import type { NextApiRequest, NextApiResponse } from "next";
import type { gallery as galleryType } from "../../public/types";

export async function gallery() {
  const response = await fetch(`${server}/api/gallery/all`);
  const jsonData: galleryType = await response.json();
  return jsonData;
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json("Status OK");
}
