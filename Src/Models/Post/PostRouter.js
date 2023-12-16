import { Router } from "express";
import * as postControllers from "./Controller/post.js"
import { Auth_Middleware } from "../../Middleware/Auth_middleware.js";
import { UploadImage } from "../../Utils/Multer.js";
export const postRouter=Router()

postRouter.get('/',postControllers.GetPost)
postRouter.post('/',Auth_Middleware,UploadImage().fields([{ name: 'image', maxCount: 5 }]),postControllers.CreatePost)