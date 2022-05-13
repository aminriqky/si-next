import { server } from "../../config"
import type { NextApiRequest, NextApiResponse } from 'next'
import type { slide as slideType } from '../../public/types'

export async function slideshow() {
    const response = await fetch(`${server}/api/slideshow/all`)
    const jsonData: slideType = await response.json()
    return jsonData
}

export default function handler( req: NextApiRequest, res: NextApiResponse) {
    res.status(200).json('Status OK')
}