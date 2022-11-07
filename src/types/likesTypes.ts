import {LikeStatusEnam} from "../middleware/commentMiddleware/commentInputMiddlewares";

export class LikesDbTypes {
    constructor(public parentId: string,
                public userId: string,
                public login: string,
                public type: LikeStatusEnam,
                public createdAt: string) {
    }

}
