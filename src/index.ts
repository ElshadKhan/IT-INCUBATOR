import express from 'express'
// import {router} from "./routes/IndexRoutes";
import {blogRouter} from "./routes/blogRouter";
import {postRouter} from "./routes/postRouter";
import {config} from 'dotenv'
config()

const app = express()

const PORT = process.env.PORT || 5000

app.use(express.json());

app.use("/blogs", blogRouter)
app.use("/posts", postRouter)

app.listen(PORT, () => {
    console.log(`Server started on port: ${PORT}`)
})