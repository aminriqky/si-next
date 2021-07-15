export async function agenda() {
    const response = await fetch(`https://webprodi.sashi.id/api/agenda/all`)
    const jsonData = await response.json()
    return jsonData
}

export default async function handler(req, res) {
    const jsonData = await agenda()
    res.status(200).json(jsonData)
}