import {Router} from "express";
import {blogRouter} from "./blogRouter";
import {postRouter} from "./postRouter";
import {blogControllers} from "../controllers/blogControllers";

export const router = Router({})

router.use('/blogs', blogRouter)
router.use('/posts', postRouter)
router.use("/testing/all-data", blogControllers.deleteBlogsAndPosts)
