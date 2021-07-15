export async function kehadiran() {
    const response = await fetch(`https://webprodi.sashi.id/api/user/all`)
    const jsonData = await response.json()
    return jsonData
}

export default async function handler(req, res) {
    const jsonData = await kehadiran()
    res.status(200).json(jsonData)
}