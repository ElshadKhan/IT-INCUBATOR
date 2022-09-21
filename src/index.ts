import express from 'express'
import {router} from "./routes/IndexRoutes";
import  cors from 'cors'
import * as dotenv from "dotenv";
dotenv.config()

const app = express()

const PORT = process.env.PORT || 5000

app.use(cors())

app.use(express.json());

app.use("/api", router)

app.listen(PORT, () => {
    console.log(`Server started on port: ${PORT}`)
})