import {userRepository} from "../repositories/userRepository";
import {QueryUserType, UserDto, UsersBusinessType} from "../types/userTypes";
import {ObjectId} from "mongodb";

export const userService = {
    async findUsers(userQueryParamsFilter: QueryUserType): Promise<UsersBusinessType> {
        const searchLoginTerm =  userQueryParamsFilter.searchLoginTerm
        const searchEmailTerm =  userQueryParamsFilter.searchEmailTerm
        const skip = userQueryParamsFilter.pageSize * (userQueryParamsFilter.pageNumber - 1)
        const sort = userQueryParamsFilter.sortBy
        const limit = userQueryParamsFilter.pageSize
        const sortDirection = userQueryParamsFilter.sortDirection
        const users = await userRepository.findUsers(searchLoginTerm, searchEmailTerm, skip, sort, sortDirection, limit)
        const totalCountUsers = await userRepository.countUsers(searchLoginTerm, searchEmailTerm)
        const userDto = {
            "pagesCount": (Math.ceil(totalCountUsers/limit)),
            "page": userQueryParamsFilter.pageNumber,
            "pageSize": limit,
            "totalCount": totalCountUsers,
            "items": users.map(u => (
                {
                id: u._id,
                login: u.login,
                email: u.email,
                createdAt: u.createdAt
                }
        ))}
        return userDto
    },
    // async findPostById(id: string): Promise<PostDto | null> {
    //     const post: PostDbType | null = await postRepository.findPostById(id);
    //     if(post) {
    //         const postDto: PostDto = {
    //             id: post!._id,
    //             title: post!.title,
    //             shortDescription: post!.shortDescription,
    //             content: post!.content,
    //             blogId: post!.blogId,
    //             blogName: post!.blogName,
    //             createdAt: post!.createdAt
    //         }
    //         return postDto
    //     }
    //     return post
    // },
    // async findPostsByBlogId(blogId: string, postQueryParamsFilter: QueryPostType): Promise<PostsBusinessType | null> {
    //     const skip = postQueryParamsFilter.pageSize * (postQueryParamsFilter.pageNumber - 1)
    //     const sort = postQueryParamsFilter.sortBy
    //     const limit = postQueryParamsFilter.pageSize
    //     const sortDirection: any = postQueryParamsFilter.sortDirection
    //     const post = await blogRepository.findBlogById(blogId);
    //     const findPosts = await postRepository.findPostsByBlogId(blogId, skip, sort, sortDirection, limit)
    //     const totalCountPosts = await postRepository.countPostsByBlogId(blogId, sort, sortDirection)
    //     if (post) {
    //         const postDto = {
    //             "pagesCount": (Math.ceil(totalCountPosts / limit)),
    //             "page": postQueryParamsFilter.pageNumber,
    //             "pageSize": limit,
    //             "totalCount": totalCountPosts,
    //             "items": findPosts.map(p => (
    //                 {
    //                     id: p._id,
    //                     title: p.title,
    //                     shortDescription: p.shortDescription,
    //                     content: p.content,
    //                     blogId: p.blogId,
    //                     blogName: p.blogName,
    //                     createdAt: p.createdAt
    //                 }
    //             ))
    //         }
    //         return postDto
    //     }
    //     return post
    // },
    async createUser(login: string, password: string, email: string): Promise<UserDto> {
        const newUser = {
            _id: new ObjectId(),
            id: String(+new Date()),
            login: login,
            password: password,
            email: email,
            createdAt: new Date().toISOString()
        }
        const result = await userRepository.createUser(newUser)
        const userDto = {
            id: newUser._id,
            login: newUser.login,
            email: newUser.email,
            createdAt: newUser.createdAt
        }
        return userDto
    },
    // async updatePost(id: string, title: string, shortDescription: string, content: string, blogId: string
    // ): Promise<boolean> {
    //     return await postRepository.updatePost(id, title, shortDescription, content, blogId)
    // },
    async deleteUser(id: string) {
        return await userRepository.deleteUser(id)
    },
    async deleteAllUsers() {
        return await userRepository.deleteAllUsers()
    }
}