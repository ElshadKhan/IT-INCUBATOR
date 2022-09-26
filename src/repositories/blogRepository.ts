type BlogDbType = {
    id: string
    name: string
    youtubeUrl: string
}
export let blogs: BlogDbType[] = []
export const blogRepository = {
    findBlogs() {
        return blogs
    },
    findBlogById(id: string) {
        let blog = blogs.find(b => b.id === id);
        return blog
    },
    createBlog(
        name: string,
        youtubeUrl: string
    ) {
        const newBlog: BlogDbType = {
            id: String(+(new Date())),
            name: name,
            youtubeUrl: youtubeUrl
        }
        blogs.push(newBlog)
        return newBlog
    },
    updateBlog(
        id: string,
        name: string,
        youtubeUrl: string
    ) {
        let blog = blogs.find(b => b.id === id);
        if (blog) {
            blog.name = name
            blog.youtubeUrl = youtubeUrl
            return true
        } else {
            return false
        }
    },
    deleteBlog(id: string) {
        for (let i = 0; i<blogs.length; i++) {
            if (blogs[i].id === id) {
                blogs.splice(i,1)
                return true
            }
        }
        return false
    },
    deleteAllBlog() {
        blogs = []
        return
    }
}