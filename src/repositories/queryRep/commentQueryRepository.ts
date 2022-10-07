import {commentsCollection} from "../../db";
import {CommentDbType, CommentsBusinessType, QueryCommentType} from "../../types/commentTypes";
import {postQueryRepository} from "./postQueryRepository";

export const commentQueryRepository = {
    async findCommentById(id: string): Promise<CommentDbType | null> {
        const comment: CommentDbType | null = await commentsCollection.findOne({id: id});
        if (comment) {
            const commentDto: CommentDbType = {
                id: comment.id,
                content: comment.content,
                userId: comment.userId,
                userLogin: comment.userLogin,
                createdAt: comment.createdAt
            }
            return commentDto
        }
        return comment
    },
    async findCommentsByPostId(postId: string, commentQueryParamsFilter: QueryCommentType): Promise<CommentsBusinessType | null> {
        const skip = commentQueryParamsFilter.pageSize * (commentQueryParamsFilter.pageNumber - 1)
        const sort = commentQueryParamsFilter.sortBy
        const limit = commentQueryParamsFilter.pageSize
        const sortDirection: any = commentQueryParamsFilter.sortDirection
        const post = await postQueryRepository.findPostById(postId);
        const findComments = await commentsCollection.find({postId: postId}).sort(sort, sortDirection).skip(skip).limit(limit).toArray()
        const totalCountPosts = await commentsCollection.find({postId: postId}).sort(sort, sortDirection).count()
        // if (post) {
        //     const commentDto = {
        //         "pagesCount": (Math.ceil(totalCountPosts / limit)),
        //         "page": commentQueryParamsFilter.pageNumber,
        //         "pageSize": limit,
        //         "totalCount": totalCountPosts,
        //         "items": findComments.map(c => (
        //             {
        //                 id: c.id,
        //                 content: c.content,
        //                 userId: c.userId,0
        //                 userLogin: c.userLogin,
        //                 createdAt: c.createdAt
        //             }
        //         ))
        //     }
        //     return commentDto
        // }
        return null
    }
}