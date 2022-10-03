import {Router} from "express";
import {blogControllers} from "../controllers/blogControllers";
import {postControllers} from "../controllers/postControllers";
import {blogValidations} from "../middleware/blogMiddleware/blogInputMiddleware";
import {authMiddleware} from "../middleware/authMiddleware";
import {
    blogIdInputParamValidation, postValidations
} from "../middleware/postMiddleware/postInputMiddlewares";
import {inputBlogIdValidation} from "../middleware/inputValidation";

export const blogRouter = Router({})

blogRouter.get('/', blogControllers.getBlogs)
blogRouter.get('/:id', blogControllers.getBlogById)
blogRouter.get('/:blogId/posts', blogIdInputParamValidation, inputBlogIdValidation,postControllers.getPostsByBlogId)
blogRouter.post('/:blogId/posts', authMiddleware, blogIdInputParamValidation, inputBlogIdValidation, postValidations, postControllers.createPostByBlogId)
blogRouter.post('/', authMiddleware, blogValidations, blogControllers.createBlog)
blogRouter.put('/:id', authMiddleware, blogValidations, blogControllers.updateBlog)
blogRouter.delete('/:id', authMiddleware, blogControllers.deleteBlog)
