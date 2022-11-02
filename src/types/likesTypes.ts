import {LikeStatusEnam} from "../middleware/commentMiddleware/commentInputMiddlewares";

export type LikesDbTypes = {
    parentId: string
    userId: string
    login: string
    type: LikeStatusEnam
    createdAt: string
}

export type LikeStatusEnamType = {
    None: string
    Like: string
    Dislike:string
}