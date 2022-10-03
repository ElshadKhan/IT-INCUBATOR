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

export type QueryPostType = {
    pageNumber: number
    pageSize: number
    sortBy: string
    sortDirection: string
}

export type PostsBusinessType = {
    pagesCount: number
    page: number
    pageSize: number
    totalCount: number
    items: Array<PostDto>
}
