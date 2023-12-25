import { Router } from "express";
import * as subCategoryController from "./Controller/subcategory.js"
import { Auth_Middleware } from "../../Middleware/Auth_middleware.js";
import { UploadImage } from "../../Utils/Multer.js";
export const subCategoryRouter=Router({mergeParams:true})
subCategoryRouter.get('/',subCategoryController.getAllsubCategory)
subCategoryRouter.post('/',Auth_Middleware,UploadImage().single('image'),subCategoryController.createsubCategory)
subCategoryRouter.patch('/:id',Auth_Middleware,UploadImage().single('image'),subCategoryController.updatesubCategory)
subCategoryRouter.delete('/:id',Auth_Middleware,subCategoryController.deletesubCategory)

