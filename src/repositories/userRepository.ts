import {usersCollection} from "../db";
import {ObjectId} from "mongodb";
import {UserDbType} from "../types/userTypes";

export const userRepository = {
    async countUsers(searchLoginTerm: string, searchEmailTerm: string) {
        return await usersCollection.find({login: {$regex: searchLoginTerm, $options: "(?i)a(?-i)cme"}, email: {$regex: searchEmailTerm, $options: "(?i)a(?-i)cme"}}).count()
    },

    async findUsers(searchLoginTerm: string, searchEmailTerm: string, skip: number, sort: string, sortDirection: any, limit: number): Promise<UserDbType[]> {
        return usersCollection.find({login: {$regex: searchLoginTerm, $options: "(?i)a(?-i)cme"}, email: {$regex: searchEmailTerm, $options: "(?i)a(?-i)cme"}}).sort(sort, sortDirection).skip(skip).limit(limit).toArray()
    },
    // async findPostById(id: string): Promise<PostDbType | null> {
    //     return postsCollection.findOne({_id: new ObjectId(id)});
    // },
    // async findPostsByBlogId(blogId: string, skip: number, sort: string, sortDirection: any, limit: number): Promise<PostDbType[]> {
    //     return postsCollection.find({blogId: blogId}).sort(sort, sortDirection).skip(skip).limit(limit).toArray()
    // },
    async createUser(newUser: UserDbType): Promise<UserDbType> {
        await usersCollection.insertOne(newUser)
        return newUser
    },
    // async updatePost(id: string, title: string, shortDescription: string, content: string, blogId: string
    // ): Promise<boolean> {
    //     const result = await postsCollection.updateOne({_id: new ObjectId(id)},
    //         { $set: {title: title, shortDescription: shortDescription, content: content, blogId: blogId}})
    //     return  result.matchedCount === 1
    // },
    async deleteUser(id: string) {
        const result = await usersCollection.deleteOne({_id: new ObjectId(id)})
        return  result.deletedCount === 1
    },
    async deleteAllUsers() {
        await usersCollection.deleteMany({})
        return
    }
}