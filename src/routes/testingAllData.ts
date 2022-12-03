import { Router } from "express";
import {userControllers} from "../controllers/userControllers";

export const testingAllDataRouter = Router({})


testingAllDataRouter.delete("/testing/all-data", userControllers.deleteAllCollections.bind(userControllers))
