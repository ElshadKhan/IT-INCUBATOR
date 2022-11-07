import {SortDirection} from "../middleware/queryValidation";

export class CommentDbType {
    constructor(public id: string,
                public content: string,
                public userId: string,
                public userLogin: string,
                public postId: string,
                public createdAt: string,
                public likesInfo: LikesInfoType) {
    }
}

export class CommentDtoType {
    constructor(public id: string,
                public content: string,
                public userId: string,
                public userLogin: string,
                public createdAt: string,
                public likesInfo: LikesInfoType) {
    }

}

export type LikesInfoType = {
    likesCount: number
    dislikesCount: number
    myStatus: string
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
    items: Array<CommentDtoType>
}
