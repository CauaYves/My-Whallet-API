import express from "express"
import cors from "cors"
import router from "./routes/index.routes.js"

const app = express()
app.use(express.json())
app.use(router)
app.use(cors())

const port = process.env.PORT || 4000
app.listen(port, console.log(`server running on port ${port}`))