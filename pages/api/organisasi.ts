import { server } from "../../config"
import type { NextApiRequest, NextApiResponse } from 'next'
import type { organisasi as orgType } from '../../public/types'

export async function organisasi() {
    const response = await fetch(`${server}/api/org/all`)
    const jsonData: orgType = await response.json()
    return jsonData
}

export default function handler( req: NextApiRequest, res: NextApiResponse) {
    res.status(200).json('Status OK')
}