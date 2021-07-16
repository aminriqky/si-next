export async function agenda() {
    const response = await fetch(`https://webprodi.sashi.id/api/agenda/all`)
    const jsonData = await response.json()
    return jsonData
}

export default async function handler(req, res) {
    res.status(200).send('Status OK')
}