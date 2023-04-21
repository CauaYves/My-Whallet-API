

export async function transacao(req, res) {

    const { tipo } = req.params
    const { token } = req.body

    if (!token) return res.sendStatus(401)
    if (tipo % 1 !== 0) res.sendStatus(422)

    res.sendStatus(200)
}
