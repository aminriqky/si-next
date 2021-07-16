export async function artikel() {
    const response = await fetch(`https://webprodi.sashi.id/api/article/all`)
    const jsonData = await response.json()
    return jsonData
}

export default async function handler(req, res) {
    res.status(200).send('Status OK')
}