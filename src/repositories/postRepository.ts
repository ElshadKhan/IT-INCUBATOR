import {blogs} from "./blogRepository";

type PostDbType = {
    id: string
    title: string
    shortDescription: string
    content: string
    blogId: string
    blogName: string
}
let posts: PostDbType[] = []
export const postRepository = {
    findPosts() {
        return posts
    },
    findPostById(id: string) {
        let post = posts.find(v => v.id === id);
        return post
    },
    createPost(
        title: string,
        shortDescription: string,
        content: string,
        blogId: string
    ) {
        const blog: any = blogs.find(b => b.id === blogId);
        const newPost: PostDbType = {
            id: String(+(new Date())),
            title: title,
            shortDescription: shortDescription,
            content: content,
            blogId: blogId,
            blogName: blog.name
        }
        posts.push(newPost)
        return newPost
    },
    updatePost(
        id: string,
        title: string,
        shortDescription: string,
        content: string,
        blogId: string
    ) {
        let post = posts.find(p => p.id === id);
        if (post) {
            post.title = title
            post.shortDescription = shortDescription
            post.content = content
            post.blogId = blogId
            return true
        } else {
            return false
        }
    },
    deletePost(id: string) {
        for (let i = 0; i<posts.length; i++) {
            if (posts[i].id === id) {
                posts.splice(i,1)
                return true
            }
        }
        return false
    },
    deleteAllPost() {
        posts = []
        return
    }
}