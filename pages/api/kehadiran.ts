import { server } from "../../config"
import type { NextApiRequest, NextApiResponse } from 'next'
import type { kehadiran as kehadiranType } from '../../public/types'

export async function kehadiran() {
    const response = await fetch(`${server}/api/user/all`)
    const jsonData: kehadiranType = await response.json()
    return jsonData
}

export default function handler( req: NextApiRequest, res: NextApiResponse) {
    res.status(200).json('Status OK')
}