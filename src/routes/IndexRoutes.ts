import {Router} from "express";
import {blogRouter} from "./blogRouter";
import {postRouter} from "./postRouter";
import {delAllControllers} from "../controllers/delAllController";

export const router = Router({})

router.use('/blogs', blogRouter)
router.use('/posts', postRouter)
router.use("/testing/all-data", delAllControllers.deleteAllBlogs)
