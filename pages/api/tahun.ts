import { server } from "../../config"
import type { NextApiRequest, NextApiResponse } from 'next'
import type { tahun as tahunType } from '../../public/types'

export async function tahun() {
    const response = await fetch(`${server}/api/year/all`)
    const jsonData: tahunType = await response.json()
    return jsonData
}

export default function handler( req: NextApiRequest, res: NextApiResponse) {
    res.status(200).json('Status OK')
}