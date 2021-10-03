import { server } from "../../config"
import type { NextApiRequest, NextApiResponse } from 'next'
import type { pengumuman as pengumumanType } from '../../public/types'

export async function pengumuman() {
    const response = await fetch(`${server}/api/pengumuman/all`)
    const jsonData: pengumumanType = await response.json()
    return jsonData
}

export default function handler( req: NextApiRequest, res: NextApiResponse) {
    res.status(200).json('Status OK')
}