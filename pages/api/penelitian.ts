import { server } from "../../config";
import type { NextApiRequest, NextApiResponse } from "next";
import type { penelitian as penelitianType } from "../../public/types";

export async function penelitian() {
  const response = await fetch(`${server}/api/penelitian/all`);
  const jsonData: penelitianType = await response.json();
  return jsonData;
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json("Status OK");
}
