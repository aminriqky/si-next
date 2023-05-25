import { server } from "../../config";
import type { NextApiRequest, NextApiResponse } from "next";
import type { info as infoType } from "../../public/types";

export async function information() {
  const response = await fetch(`${server}/api/information`);
  const jsonData: infoType = await response.json();
  return jsonData;
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json("Status OK");
}
