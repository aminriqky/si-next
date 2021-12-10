import { server } from "../../config"
import type { NextApiRequest, NextApiResponse } from 'next'
import type { agenda as agendaType } from '../../public/types'

export async function agenda() {
    const response = await fetch(`${server}/api/agenda/all`)
    const jsonData: agendaType = await response.json()
    return jsonData
}

export default function handler( req: NextApiRequest, res: NextApiResponse) {
    res.status(200).json('Status OK')
}