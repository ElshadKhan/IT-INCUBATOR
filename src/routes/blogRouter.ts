import {Router} from "express";
import {blogControllers} from "../controllers/blogControllers";
import {postControllers} from "../controllers/postControllers";
import {blogValidations} from "../middleware/blogMiddleware/blogInputMiddleware";
import {authMiddleware} from "../middleware/authMiddleware";
import { postValidations
} from "../middleware/postMiddleware/postInputMiddlewares";

export const blogRouter = Router({})

blogRouter.get('/', blogControllers.getBlogs)
blogRouter.get('/:id', blogControllers.getBlogById)
blogRouter.get('/:blogId/posts', postControllers.getPostsByBlogId)
blogRouter.post('/:blogId/posts', authMiddleware, postValidations, postControllers.createPostByBlogId)
blogRouter.post('/', authMiddleware, blogValidations, blogControllers.createBlog)
blogRouter.put('/:id', authMiddleware, blogValidations, blogControllers.updateBlog)
blogRouter.delete('/:id', authMiddleware, blogControllers.deleteBlog)
