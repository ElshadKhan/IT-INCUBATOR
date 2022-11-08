import {Router} from "express";
import {userRouter} from "./userRouter";
import {blogRouter} from "./blogRouter";
import {postRouter} from "./postRouter";
import {UserControllers} from "../controllers/userControllers";
import {commentRouter} from "./commentRouter";
import {sessionRouter} from "./sessionRouter";
import {authRouter} from "./authRouter";
import {container} from "../composition-root";

export const router = Router({})

const userControllers = container.resolve(UserControllers)

router.use('/users', userRouter)
router.use('/blogs', blogRouter)
router.use('/posts', postRouter)
router.use('/comments', commentRouter)
router.use('/security', sessionRouter)
router.use('/auth', authRouter)
router.delete("/testing/all-data", userControllers.deleteAllCollections.bind(userControllers))
