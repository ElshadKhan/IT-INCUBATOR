import {Router} from "express";
import {userRouter} from "./userRouter";
import {blogRouter} from "./blogRouter";
import {postRouter} from "./postRouter";
import {delAllControllers} from "../controllers/delAllController";

export const router = Router({})

router.use('/users', userRouter)
router.use('/blogs', blogRouter)
router.use('/posts', postRouter)
router.use("/testing/all-data", delAllControllers.deleteAllCollections)
