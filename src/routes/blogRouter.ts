import {Router} from "express";
import {blogControllers} from "../controllers/blogControllers";
import {postControllers} from "../controllers/postControllers";
import {blogIdQueryValidation, blogValidations} from "../middleware/blogMiddleware/blogInputMiddleware";
import {authMiddleware, findUserIdMiddleware} from "../middleware/authMiddleware";
import {postQueryValidationsBlogId} from "../middleware/postMiddleware/postInputMiddlewares";

export const blogRouter = Router({})

blogRouter.get('/blogs', blogControllers.getBlogs.bind(blogControllers))
blogRouter.get('/blogs/:id', blogControllers.getBlogById.bind(blogControllers))
blogRouter.get('/blogs/:blogId/posts', findUserIdMiddleware, blogIdQueryValidation, postControllers.getPostsByBlogId.bind(postControllers))
blogRouter.post('/blogs/:blogId/posts', authMiddleware, postQueryValidationsBlogId, postControllers.createPostByBlogId.bind(postControllers))
blogRouter.post('/blogs', authMiddleware, blogValidations, blogControllers.createBlog.bind(blogControllers))
blogRouter.put('/blogs/:id', authMiddleware, blogValidations, blogControllers.updateBlog.bind(blogControllers))
blogRouter.delete('/blogs/:id', authMiddleware, blogControllers.deleteBlog.bind(blogControllers))
