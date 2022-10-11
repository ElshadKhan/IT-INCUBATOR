import {SortDirection} from "../middleware/queryValidation";

export type CommentDbType = {
    id: string
    content: string
    userId: string
    userLogin: string
    createdAt: string
}
export type QueryCommentType = {
    pageNumber: number
    pageSize: number
    sortBy: string
    sortDirection: SortDirection
}

export type CommentsBusinessType = {
    pagesCount: number
    page: number
    pageSize: number
    totalCount: number
    items: Array<CommentDbType>
}
