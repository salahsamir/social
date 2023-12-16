import { Router } from "express";
import * as userControler from"./Controller/user.js"
import { Auth_Middleware } from "../../Middleware/Auth_middleware.js";
import * as validation from'./user.validate.js'
import { Validation_Middleware } from "../../Middleware/Validations.js";
import { UploadImage } from "../../Utils/Multer.js";

export const userRouter=Router()
userRouter.get('/',Auth_Middleware,userControler.GetProfile)
userRouter.patch('/',Auth_Middleware,Validation_Middleware(validation.updatePassowrd),userControler.UpdatePassword)
userRouter.patch('/image',Auth_Middleware,UploadImage().single('image'),userControler.addImage)
