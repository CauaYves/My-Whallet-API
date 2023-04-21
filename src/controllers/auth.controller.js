import bcrypt from "bcrypt"
import { loginSchema } from "../schema/user.schema.js"
import { db } from "../database/database.connection.js"
import { v4 as uuid } from "uuid"

export async function login(req, res) {
    const { email, password } = req.body
    const { authorization } = req.headers

    //validação de dados

    const { error } = loginSchema.validate(req.body)
    if (error) return res.status(422).send("dados inválidos")

    //caso haja token fará login automatico
    if (authorization) {
        try {
            const token = authorization?.replace("Bearer ", "")
            const tokenStoked = await db.collection("sessoes").findOne({ token: token })
            const user = await db.collection("cadastros").findOne({ _id: tokenStoked.userid })
            delete user.password
            return res.send(user)
        }
        catch (err) {
            res.status(500).send(err.message)
        }
    }
    //caso não haja token será inserido um no banco de sessoes
    if (!authorization) {
        try {
            const userSearch = await db.collection("cadastros").findOne({ email: email })
            if (!userSearch) return res.status(422).send("usuário não encontrado")

            const rightPassword = bcrypt.compareSync(password, userSearch.password)
            if (!rightPassword) return res.status(401).send("credenciais incorretas, caso não tenha cadastro acesse a página de cadastro.")

            const token = uuid()

            await db.collection("sessoes").insertOne({
                userid: userSearch._id,
                token
            })

            res.status(200).send({token: token, name: userSearch.name})
        }
        catch (err) {
            res.status(500).send(err.message)
        }
    }

}
export async function cadastro(req, res) {

    const { email, password, name } = req.body

    const hash = bcrypt.hashSync(password, 5)

    try {
        const thisEmailExist = await db.collection("cadastros").findOne({ email: email })
        if (thisEmailExist) return res.status(409).send("esse email já existe, tente outro")

        await db.collection("cadastros").insertOne({
            name: name,
            email,
            password: hash,
        })
    }
    catch (err) {
        res.status(500).send(err.message)
    }

    res.sendStatus(201)
}
