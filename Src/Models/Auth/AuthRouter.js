import { Router } from "express";
import *  as AuthController from'./Controller/Auth.js'
import { Validation_Middleware } from "../../Middleware/Validations.js";
import * as validate from "./Auth.validate.js"
export const Auth=Router()
Auth.get('/',AuthController.get)
Auth.post('/signup',Validation_Middleware(validate.signup_validate),AuthController.Signup)
Auth.get('/confirm/:token',AuthController.ConfirmEmail)
Auth.post('/signin',Validation_Middleware(validate.signin_validate),AuthController.SignIn)
Auth.post('/forgetpassword',Validation_Middleware(validate.forgetpassword),AuthController.ForgetPassword)
Auth.post('/confirmcode',Validation_Middleware(validate.confirmcode),AuthController.ConfirmCode)
Auth.patch('/changepassword',Validation_Middleware(validate.changepassword),AuthController.ChangePassword)