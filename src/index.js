import express from "express"
import joi from "joi"
import { MongoClient, ObjectId } from "mongodb"
import cors from "cors"
import { v4 as uuid } from 'uuid'
import bcrypt, { compareSync } from "bcrypt"
import dotenv from "dotenv"

//configs

const app = express()
app.use(express.json())
app.use(cors())
dotenv.config()

//conexão com banco de dados

const mongoClient = new MongoClient(process.env.DATABASE_URL)
try {
    await mongoClient.connect()
    console.log("Database connected!")
}
catch (err) {
    console.log(err.message)
}
const db = mongoClient.db()

//esquema de validação dos dados

const registerSchema = joi.object({
    name: joi.string().min(3).required(),
    email: joi.string().email().required(),
    password: joi.string().min(3).required(),
});

//endpoints

app.post("/cadastro", async (req, res) => {

    const { email, password, name } = req.body
    const { error } = registerSchema.validate(req.body, { abortEarly: false })
    if (error) return res.status(422).send(error.details.message)

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
})
app.post("/login", async (req, res) => {
    const { email, password } = req.body

    if (!email || !password) return res.status(422).send("campos inválidos")

    try {
        const userSearch = await db.collection("cadastros").findOne({ email: email })
        if (!userSearch) return res.status(422).send("usuário não encontrado")

        const rightPassword = bcrypt.compareSync(password, userSearch.password)
        if (!rightPassword) return res.status(401).send("credenciais incorretas, caso não tenha cadastro acesse a página de cadastro.")

        const token = uuid()

        await db.collection("sessoes").insertOne({
            id: userSearch._id,
            token
        })

        res.status(200).send(token)
    }
    catch (err) {
        res.status(500).send(err.message)
    }
})
app.get("/auto-login", async (req, res) => {
    const { authorization } = req.headers

    const token = authorization?.replace("Bearer ", "")
    if (!token) return res.status(401).send("token não existe, faça login")

    try {
        const userLogado = db.collection("sessoes").findOne({ token })
        if (!userLogado) return res.status(401).send("token expirado")

        const user = await db.collection("usuarios").findOne({ _id: new ObjectId(sessao.idUsuario) })
        delete usuario.senha

        res.send((usuario))
    }
    catch (error) {
        res.status(500).send(err.message)
    }
})
app.post("/nova-transacao/:tipo", async (req, res) => {

    const { tipo } = req.params
    const { token } = req.body

    if (!token) return res.sendStatus(401)
    if (tipo % 1 !== 0) res.sendStatus(422)

    res.sendStatus(200)
})
app.get("/home", async (req, res) => {
    const { token } = req.body

    if (!token) return res.sendStatus(401)

})
const port = process.env.PORT || 4000
app.listen(port, console.log(`server running on port ${port}`))