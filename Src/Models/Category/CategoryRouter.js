import { Router } from "express";
import * as CategoryController from "./Controller/Category.js"
import { Auth_Middleware } from "../../Middleware/Auth_middleware.js";
import { UploadImage } from "../../Utils/Multer.js";
import { Validation_Middleware } from "../../Middleware/Validations.js";
import { createCategory, deleteCategory, updateCategory } from "./Category.validation.js";
import { subCategoryRouter } from "../Subcategory/subcategory.router.js";
export const CategoryRouter=Router()
CategoryRouter.use('/:id/subcategory',subCategoryRouter)
CategoryRouter.get('/',CategoryController.getAllCategory)
CategoryRouter.post('/',Auth_Middleware,UploadImage().single('image'),Validation_Middleware(createCategory),CategoryController.createCategory)
CategoryRouter.patch('/:id',Auth_Middleware,UploadImage().single('image'),Validation_Middleware(updateCategory),CategoryController.updateCategory)
CategoryRouter.delete('/:id',Auth_Middleware,Validation_Middleware(deleteCategory),CategoryController.deleteCategory)
