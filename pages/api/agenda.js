import { server } from "../../config"

export async function agenda() {
    const response = await fetch(`${server}/api/agenda/all`)
    const jsonData = await response.json()
    return jsonData
}

export default async function handler(req, res) {
    res.status(200).send('Status OK')
}