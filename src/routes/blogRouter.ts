import {Router} from "express";
import {blogControllers} from "../controllers/blogControllers";
import {postControllers} from "../controllers/postControllers";
import {blogIdQueryValidation, blogValidations} from "../middleware/blogMiddleware/blogInputMiddleware";
import {authMiddleware, findUserIdMiddleware} from "../middleware/authMiddleware";
import {postQueryValidationsBlogId} from "../middleware/postMiddleware/postInputMiddlewares";

export const blogRouter = Router({})

blogRouter.get('/', blogControllers.getBlogs.bind(blogControllers))
blogRouter.get('/:id', blogControllers.getBlogById.bind(blogControllers))
blogRouter.get('/:blogId/posts', findUserIdMiddleware, blogIdQueryValidation, postControllers.getPostsByBlogId.bind(postControllers))
blogRouter.post('/:blogId/posts', authMiddleware, postQueryValidationsBlogId, postControllers.createPostByBlogId.bind(postControllers))
blogRouter.post('/', authMiddleware, blogValidations, blogControllers.createBlog.bind(blogControllers))
blogRouter.put('/:id', authMiddleware, blogValidations, blogControllers.updateBlog.bind(blogControllers))
blogRouter.delete('/:id', authMiddleware, blogControllers.deleteBlog.bind(blogControllers))
