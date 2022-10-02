import {Router} from "express";
import {blogRouter} from "./blogRouter";
import {postRouter} from "./postRouter";
import {blogControllers} from "../controllers/blogControllers";
import {postControllers} from "../controllers/postControllers";

export const router = Router({})

router.use('/blogs', blogRouter)
router.use('/posts', postRouter)
router.use("/testing/all-data", blogControllers.deleteAllBlogs, postControllers.deleteAllPosts)
