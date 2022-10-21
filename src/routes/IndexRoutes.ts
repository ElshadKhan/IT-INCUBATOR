import {Router} from "express";
import {userRouter} from "./userRouter";
import {blogRouter} from "./blogRouter";
import {postRouter} from "./postRouter";
import {userControllers} from "../controllers/userControllers";
import {commentRouter} from "./commentRouter";
import {sessionsRouter} from "./deviceRouter";
import {authRouter} from "./authRouter";

export const router = Router({})

router.use('/users', userRouter)
router.use('/blogs', blogRouter)
router.use('/posts', postRouter)
router.use('/comments', commentRouter)
router.use('/security', sessionsRouter)
router.use('/auth', authRouter)
router.delete("/testing/all-data", userControllers.deleteAllCollections)
