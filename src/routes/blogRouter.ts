import {Router} from "express";
import {blogControllers} from "../controllers/blogControllers";
import {blogValidations} from "../middleware/blogMiddleware/blogInputMiddleware";
import {authMiddleware} from "../middleware/authMiddleware";

export const blogRouter = Router({})

blogRouter.get('/', blogControllers.getBlogs)
blogRouter.get('/:id', blogControllers.getBlogById)
blogRouter.post('/', authMiddleware, blogValidations, blogControllers.createBlog)
blogRouter.put('/:id', authMiddleware, blogValidations, blogControllers.updateBlog)
blogRouter.delete('/:id', authMiddleware, blogControllers.deleteBlog)
