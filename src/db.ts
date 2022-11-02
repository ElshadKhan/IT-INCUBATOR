import {MongoClient} from "mongodb"
import {PostDbType} from "./types/postTypes";
import * as dotenv from "dotenv";
import {LikesTypes} from "./types/likesTypes";
dotenv.config()

const mongoUri = process.env.MONGODB_URL || ""

export const client = new MongoClient(mongoUri);

const db = client.db("network")
export const postsCollection = db.collection<PostDbType>("posts")
export const likesCollection = db.collection<LikesTypes>("likes-dislikes")

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