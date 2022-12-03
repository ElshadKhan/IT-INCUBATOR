import express from 'express'
import cookieParser from "cookie-parser"
import  cors from 'cors'
import * as dotenv from "dotenv";
dotenv.config()
import {runDb} from "./db/dbMongoose";
import {testingAllDataRouter} from "./routes/testingAllData";
import {userRouter} from "./routes/userRouter";
import {blogRouter} from "./routes/blogRouter";
import {postRouter} from "./routes/postRouter";
import {commentRouter} from "./routes/commentRouter";
import {sessionRouter} from "./routes/sessionRouter";
import {authRouter} from "./routes/authRouter";

export const app = express()

const PORT = process.env.PORT || 5000

app.use(cors())

app.use(cookieParser())

app.use(express.json());

app.set('trust proxy', true)

app.use("/",
    userRouter,
    blogRouter,
    postRouter,
    commentRouter,
    sessionRouter,
    authRouter,
    testingAllDataRouter
)

const startApp = async () => {
    await runDb()
    app.listen(PORT, () => {
        console.log(`Server started on port: ${PORT}`)
    })
}

startApp()

