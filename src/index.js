import express from "express"
import joi from "joi"
import { MongoClient, ObjectId } from "mongodb"
import cors from "cors"

//configs

const app = express()
app.use(express.json())
app.use(cors())

//conexão com banco de dados

const mongoClient = new MongoClient("mongodb://localhost:27017/whallet")
try {
    await mongoClient.connect()
    console.log("Database connected!")
}
catch (err) {
    console.log(err.message)
}
const db = mongoClient.db()
const registerSchema = joi.object({ //esquema de validação dos dados
    email: joi.string().email().required(),
    password: joi.string().min(3).required(),
});

//endpoints

app.post("/cadastro", async (req, res) => {

    const { email, password } = req.body
    const { error, value } = registerSchema.validate({ email, password })

    if (error) return res.status(422).send(error.details[0].message)
    try {
        await db.collection("cadastros").insertOne({
            email,
            password
        })
        const thisEmailExist = await db.collection("cadastros").findOne({email})
        if(thisEmailExist) return res.sendStatus(409)
    }
    catch (err) {
        res.status(500).send(err.message)
    }

    res.sendStatus(201)
})

const PORT = 4000
app.listen(PORT, console.log(`server running on port ${PORT}`))