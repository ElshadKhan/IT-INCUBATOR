import {Router} from "express";
import {blogControllers} from "../controllers/blogControllers";
import {blogValidations} from "../middleware/blogMiddleware/blogInputMiddleware";
import {authMiddleware} from "../middleware/authMiddleware";
import {blogQueryParamsValidation} from "../middleware/blogMiddleware/blogQueryParamsMiddleware";

export const blogRouter = Router({})

blogRouter.get('/',blogQueryParamsValidation , blogControllers.getBlogs)
blogRouter.get('/:id', blogControllers.getBlogById)
blogRouter.get('/:blogId/posts', blogControllers.getPostsByBlogId)
blogRouter.post('/', authMiddleware, blogValidations, blogControllers.createBlog)
blogRouter.put('/:id', authMiddleware, blogValidations, blogControllers.updateBlog)
blogRouter.delete('/:id', authMiddleware, blogControllers.deleteBlog)
