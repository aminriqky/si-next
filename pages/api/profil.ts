import { server } from "../../config";
import type { NextApiRequest, NextApiResponse } from "next";
import type { profil as profilType } from "../../public/types";

export async function profil() {
  const response = await fetch(`${server}/api/profile/all`);
  const jsonData: profilType = await response.json();
  return jsonData;
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json("Status OK");
}
