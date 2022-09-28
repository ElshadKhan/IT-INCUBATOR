import {MongoClient, ServerApiVersion} from "mongodb"
import {BlogDbType} from "./repositories/blogRepository";
import {PostDbType} from "./repositories/postRepository";

const mongoUri = process.env.MONGODB_URL
// @ts-ignore
export const client = new MongoClient(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

const db = client.db("network")
export const blogsCollection = db.collection<BlogDbType>("blogs")
export const postsCollection = db.collection<PostDbType>("posts")

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