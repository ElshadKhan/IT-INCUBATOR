import {ObjectId} from "mongodb";

export type BlogDbType = {
    _id: ObjectId
    id: string
    name: string
    youtubeUrl: string
    createdAt: string
}

export type BlogDto = {
    id: ObjectId
    name: string
    youtubeUrl: string
    createdAt: string
}

export type QueryBlogType = {
    searchNameTerm: string
    pageNumber: number
    pageSize: number
    sortBy: string
    sortDirection: string
}