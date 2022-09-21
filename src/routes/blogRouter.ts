import {Router} from "express";
import {blogControllers} from "../controllers/blogControllers";
import {blogInputControlMiddleware} from "../middleware/blogMiddleware/blogInputControlMiddleware";
import {inputBlogValidationMiddleware} from "../middleware/input-validation-middleware";

export const blogRouter = Router({})

blogRouter.get('/', blogControllers.getBlogs)
blogRouter.get('/:id', blogControllers.getBlogById)
blogRouter.post('/', blogInputControlMiddleware, inputBlogValidationMiddleware, blogControllers.createBlog)
blogRouter.put('/:id',blogInputControlMiddleware, inputBlogValidationMiddleware, blogControllers.updateBlog)
blogRouter.delete('/:id', inputBlogValidationMiddleware, blogControllers.deleteBlog)
