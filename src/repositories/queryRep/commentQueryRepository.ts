import {CommentDtoType, CommentsBusinessType, QueryCommentType} from "../../types/commentTypes";
import {getPagesCounts, getSkipNumber} from "../../helpers/helpFunctions";
import {CommentModelClass} from "../../db/Schema/commentSchema";
import {LikeStatusRepository} from "../likeStatusRepository";
import {LikeStatusEnam} from "../../middleware/commentMiddleware/commentInputMiddlewares";
import {UserAccountDBType} from "../../types/userTypes";

export class CommentQueryRepository {
    constructor(private likeStatusRepository = new LikeStatusRepository()) {
    }
    async findCommentByUserIdAndCommentId(id: string, user?: UserAccountDBType): Promise<CommentDtoType | null> {
        const comment = await CommentModelClass.findOne({id: id})
        if (!comment) return null

        let myStatus = LikeStatusEnam.None

        if (user) {
            const result = await this.likeStatusRepository.getLikeStatus(id, user.id)
            myStatus = result?.type || LikeStatusEnam.None
        }

        const likesCount = await this.likeStatusRepository.getLikesCount(id, LikeStatusEnam.Like)
        const dislikesCount = await this.likeStatusRepository.getDislikesCount(id, LikeStatusEnam.Dislike)

        return {
            id: comment.id,
            content: comment.content,
            userId: comment.userId,
            userLogin: comment.userLogin,
            createdAt: comment.createdAt,
            likesInfo: {
                likesCount: likesCount,
                dislikesCount: dislikesCount,
                myStatus: myStatus
            }
        }
    }

    async findCommentById(id: string): Promise<CommentDtoType | null> {
        return await CommentModelClass.findOne({id: id})
    }

    async findCommentsByPostIdAndUserId(postId: string, {
        pageNumber,
        pageSize,
        sortBy,
        sortDirection
    }: QueryCommentType, user?: UserAccountDBType): Promise<CommentsBusinessType | null> {
        const comment = await CommentModelClass.findOne({postId: postId})
        const findComments = await CommentModelClass.find({postId: postId}).sort([[sortBy, sortDirection]]).skip(getSkipNumber(pageNumber, pageSize)).limit(pageSize).lean()
        const totalCountComments = await CommentModelClass.find({postId: postId}).sort([[sortBy, sortDirection]]).count()
        if (comment) {
            const promis = findComments.map(async (c) => {
                let myStatus = LikeStatusEnam.None

                if (user) {
                    const result = await this.likeStatusRepository.getLikeStatus(c.id, user.id)
                    myStatus = result?.type || LikeStatusEnam.None
                }
                const likesCount = await this.likeStatusRepository.getLikesCount(c.id, LikeStatusEnam.Like)
                const dislikesCount = await this.likeStatusRepository.getDislikesCount(c.id, LikeStatusEnam.Dislike)
                return {
                    id: c.id,
                    content: c.content,
                    userId: c.userId,
                    userLogin: c.userLogin,
                    createdAt: c.createdAt,
                    likesInfo: {
                        likesCount: likesCount,
                        dislikesCount: dislikesCount,
                        myStatus: myStatus
                    }
                }
            })
            const items = await Promise.all(promis)
            return {
                "pagesCount": getPagesCounts(totalCountComments, pageSize),
                "page": pageNumber,
                "pageSize": pageSize,
                "totalCount": totalCountComments,
                "items": items
            }

        }
        return comment
    }
}

