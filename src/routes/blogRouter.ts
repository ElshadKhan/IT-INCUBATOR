import {Router} from "express";
import {blogControllers} from "../controllers/blogControllers";
import {blogRoutValidators} from "../middleware/blogMiddleware/blogInputControlMiddleware";
import {authMiddleware} from "../middleware/authMiddleware";
import {inputValidation} from "../middleware/inputValidation";

export const blogRouter = Router({})

blogRouter.get('/', blogControllers.getBlogs)
blogRouter.get('/:id', blogControllers.getBlogById)
blogRouter.post('/', authMiddleware, blogRoutValidators, inputValidation, blogControllers.createBlog)
blogRouter.put('/:id', authMiddleware, blogRoutValidators, inputValidation, blogControllers.updateBlog)
blogRouter.delete('/:id', authMiddleware, blogControllers.deleteBlog)
