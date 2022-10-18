import {MongoClient} from "mongodb"
import {BlogDbType} from "./types/blogTypes";
import {PostDbType} from "./types/postTypes";
import {RefreshToken, UserAccountDBType} from "./types/userTypes";
import {CommentDbType} from "./types/commentTypes";
import * as dotenv from "dotenv";
dotenv.config()

const mongoUri = process.env.MONGODB_URL || ""


export const client = new MongoClient(mongoUri);

const db = client.db("network")
export const usersCollection = db.collection<UserAccountDBType>("users")
export const tokensCollection = db.collection<RefreshToken>("blackListOfRefreshToken")
export const blogsCollection = db.collection<BlogDbType>("blogs")
export const postsCollection = db.collection<PostDbType>("posts")
export const commentsCollection = db.collection<CommentDbType>("comments")

export async function runDb() {
    try {
        await client.connect();
        await client.db
        console.log("Connected successfully to mongo server")
    } catch {
        console.log("Can't connect to db")
        await client.close()
    }
}