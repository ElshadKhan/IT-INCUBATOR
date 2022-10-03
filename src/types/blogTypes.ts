import {ObjectId} from "mongodb";
import {PostDto} from "./postTypes";

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

export type BlogsBusinessType = {
    pagesCount: number
    page: number
    pageSize: number
    totalCount: number
    items: Array<BlogDto>
}