import { server } from "../../config"
import type { NextApiRequest, NextApiResponse } from 'next'
import type { download as downloadType } from '../../public/types'

export async function download() {
    const response = await fetch(`${server}/api/download/all`)
    const jsonData: downloadType = await response.json()
    return jsonData
}

export default function handler( req: NextApiRequest, res: NextApiResponse) {
    res.status(200).json('Status OK')
}