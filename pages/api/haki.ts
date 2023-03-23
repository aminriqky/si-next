import { server } from "../../config";
import type { NextApiRequest, NextApiResponse } from "next";
import type { haki as hakiType } from "../../public/types";

export async function haki() {
  const response = await fetch(`${server}/api/haki/all`);
  const jsonData: hakiType = await response.json();
  return jsonData;
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json("Status OK");
}
