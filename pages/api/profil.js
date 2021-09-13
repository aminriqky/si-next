import { server } from "../../config"

export async function profil() {
    const response = await fetch(`${server}/api/profile/all`)
    const jsonData = await response.json()
    return jsonData
}

export default async function handler(req, res) {
    res.status(200).send('Status OK')
}