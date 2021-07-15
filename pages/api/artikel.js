export async function artikel() {
    const response = await fetch(`https://webprodi.sashi.id/api/article/all`)
    const jsonData = await response.json()
    return jsonData
}

export default async function handler(req, res) {
    const jsonData = await artikel()
    res.status(200).json(jsonData)
}