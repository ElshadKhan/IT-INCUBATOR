import {Router} from "express";
import {blogControllers} from "../controllers/blogControllers";
import {postControllers} from "../controllers/postControllers";
import {blogIdQueryValidation, blogValidations} from "../middleware/blogMiddleware/blogInputMiddleware";
import {authMiddleware, findUserIdMiddleware} from "../middleware/authMiddleware";
import {postQueryValidationsBlogId} from "../middleware/postMiddleware/postInputMiddlewares";

export const blogRouter = Router({})

blogRouter.get('/', blogControllers.getBlogs)
blogRouter.get('/:id', blogControllers.getBlogById)
blogRouter.get('/:blogId/posts', findUserIdMiddleware, blogIdQueryValidation, postControllers.getPostsByBlogId)
blogRouter.post('/:blogId/posts', authMiddleware, postQueryValidationsBlogId, postControllers.createPostByBlogId)
blogRouter.post('/', authMiddleware, blogValidations, blogControllers.createBlog)
blogRouter.put('/:id', authMiddleware, blogValidations, blogControllers.updateBlog)
blogRouter.delete('/:id', authMiddleware, blogControllers.deleteBlog)
