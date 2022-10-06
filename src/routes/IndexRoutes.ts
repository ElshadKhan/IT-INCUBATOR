import {Router} from "express";
import {userRouter} from "./userRouter";
import {blogRouter} from "./blogRouter";
import {postRouter} from "./postRouter";
import {userControllers} from "../controllers/userControllers";

export const router = Router({})

router.use('/users', userRouter)
router.use('/blogs', blogRouter)
router.use('/posts', postRouter)
router.use('/auth', userRouter)
router.delete("/testing/all-data", userControllers.deleteAllCollections)
