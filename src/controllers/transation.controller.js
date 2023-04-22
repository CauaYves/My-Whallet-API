import { db } from "../database/database.connection.js"
import { entrySchema } from "../schema/user.schema.js"

export async function transacao(req, res) {

    const { type, value, description } = req.body
    const { authorization } = req.headers

    if (!authorization) return res.sendStatus(401)

    const { error } = entrySchema.validate(req.body)
    if (error) return res.status(422).send("dados inválidos, certifique de que todos os campos estão preenchidos e no formato correto")

    const token = authorization?.replace("Bearer ", "")

    const tokenStoked = await db.collection("sessoes").findOne({ token: token })
    const user = await db.collection("cadastros").findOne({ _id: tokenStoked.userid })

    await db.collection("transacoes").insertOne({
        user,
        type,
        value,
        description
    })

    res.sendStatus(201)
}
