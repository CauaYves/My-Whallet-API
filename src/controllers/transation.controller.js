import dayjs from "dayjs"
import { db } from "../database/database.connection.js"
import { entrySchema } from "../schema/user.schema.js"
import { ObjectId } from "mongodb"

export async function transacao(req, res) {

    const { type, value, description } = req.body
    const { authorization } = req.headers
    

    if (!authorization) return res.sendStatus(401)

    const { error } = entrySchema.validate(req.body)
    if (error) return res.status(422).send("dados inválidos, certifique de que todos os campos estão preenchidos e no formato correto")

    const token = authorization?.replace("Bearer ", "")

    const tokenStoked = await db.collection("sessoes").findOne({ token: token })
    const userId = new ObjectId(tokenStoked.userid)
    const user = await db.collection("cadastros").findOne({ _id: tokenStoked.userid })

    delete user.password
    delete user.email
    delete user.name
    
    await db.collection("transacoes").insertOne({
        user,
        type,
        value,
        description,
        date: dayjs().format('DD/MM')
    })
    const transacoes = await db.collection("transacoes").find().toArray()
    //filtrar transacoes e enviar apenas as do usuario correspondente ao token
    const userTransactions = transacoes.filter(transacao => transacao.user._id.equals(userId));
    res.status(200).send(userTransactions)
}
