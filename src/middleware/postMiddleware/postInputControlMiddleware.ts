import {NextFunction, Request, Response} from "express";
import {blogs} from "../../repositories/blogRepository";

export const postInputControlMiddleware = (req: Request, res: Response, next: NextFunction) => {

    const title = req.body.title

    const shortDescription = req.body.shortDescription

    const content = req.body.content

    const blogId = req.body.blogId

    const blog = blogs.find(b => b.id === blogId);

    const errors: {message: string, field: string}[] = []

    if(!title || typeof title !== "string" || !title.trim() || title.length > 30) {
        errors.push({message: 'title is wrong', field: 'title'})
    }
    if(!shortDescription || typeof shortDescription !== "string" || !shortDescription.trim() || shortDescription.length > 100) {
        errors.push({message: 'shortDescription is wrong', field: 'shortDescription'})
    }
    if(!content || typeof content !== "string" || !content.trim() || content.length > 1000) {
        errors.push({message: 'content is wrong', field: 'content'})
    }
    if(!blog || typeof blogId !== "string") {
        errors.push({message: 'blogId is wrong', field: 'blogId'})
    }
    if (errors.length) {
        return res.status(400).send({"errorsMessages": errors})
    } else {
        next()
    }
}