import express from 'express'
// import {router} from "./routes/IndexRoutes";
import {blogRouter} from "./routes/blogRouter";
import {postRouter} from "./routes/postRouter";
import  cors from 'cors'
import * as dotenv from "dotenv";
dotenv.config()

const app = express()

const PORT = process.env.PORT || 5000

app.use(cors())
app.use(express.json());
app.delete("/testing/all-data", (req, res) => {
    return []
})
app.use("/blogs", blogRouter)
app.use("/posts", postRouter)


app.listen(PORT, () => {
    console.log(`Server started on port: ${PORT}`)
})