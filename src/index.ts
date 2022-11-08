import express from 'express'
import cookieParser from "cookie-parser"
import  cors from 'cors'
import * as dotenv from "dotenv";
dotenv.config()
import {runDb} from "./db/dbMongoose";
import {router} from "./routes/IndexRoutes";

const app = express()

const PORT = process.env.PORT || 5000

app.use(cors())

app.use(cookieParser())

app.use(express.json());

app.set('trust proxy', true)

app.use("/api", router)

const startApp = async () => {
    await runDb()
    app.listen(PORT, () => {
        console.log(`Server started on port: ${PORT}`)
    })
}

startApp()

