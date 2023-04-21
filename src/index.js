import express from "express"
import cors from "cors"
import router from "./routes/index.routes.js"

const app = express()
app.use(express.json())
app.use(router)

app.use((req,res,next) => {
  req.header("Acess-Control-Allow-Origin", "*")
  app.use(cors())
  next()
})

const port = process.env.PORT || 4000
app.listen(port, console.log(`server running on port ${port}`))