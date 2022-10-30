import {SortDirection} from "../middleware/queryValidation";

export type PostDbType = {
    id: string
    title: string
    shortDescription: string
    content: string
    blogId: string
    blogName: string | null
    createdAt: string
}
export type PostDtoType = {
    id: string
    title: string
    shortDescription: string
    content: string
    blogId: string
    blogName: string | null
    createdAt: string
    extendedLikesInfo: ExtendedLikesInfoType
}
export type ExtendedLikesInfoType = {
    likesCount: number
    dislikesCount: number
    myStatus: string
    newestLikes: Array<NewestLikesType>
}
export type NewestLikesType = {
    addedAt: string
    userId: string
    login: string
}
export type QueryPostType = {
    pageNumber: number
    pageSize: number
    sortBy: string
    sortDirection: SortDirection
}

export type PostsBusinessType = {
    pagesCount: number
    page: number
    pageSize: number
    totalCount: number
    items: Array<PostDtoType>
}

export type PostsBusinessForBlogIdType = {
    pagesCount: number
    page: number
    pageSize: number
    totalCount: number
    items: Array<PostDbType>
}
