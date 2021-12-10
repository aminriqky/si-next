import { server } from "../../config"
import type { NextApiRequest, NextApiResponse } from 'next'
import type { artikel as artikelType } from '../../public/types'

export async function artikel() {
    const response = await fetch(`${server}/api/article/all`)
    const jsonData: artikelType = await response.json()
    return jsonData
}

export default function handler( req: NextApiRequest, res: NextApiResponse) {
    res.status(200).json('Status OK')
}