import express from 'express'
import {router} from "./routes/IndexRoutes";
require('dotenv').config()

const app = express()

const PORT = process.env.PORT || 5000

app.use(express.json());

app.use("/api", router)

app.listen(PORT, () => {
    console.log(`Server started on port: ${PORT}`)
})