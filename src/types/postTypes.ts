import {ObjectId} from "mongodb";

export type PostDbType = {
    _id: ObjectId
    id: string
    title: string
    shortDescription: string
    content: string
    blogId: string
    blogName: string | null
    createdAt: string
}
export type PostDto = {
    id: ObjectId
    title: string
    shortDescription: string
    content: string
    blogId: string
    blogName: string | null
    createdAt: string
}