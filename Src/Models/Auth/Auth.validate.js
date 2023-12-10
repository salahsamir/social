import joi from 'joi'
import { generalFields } from '../../Middleware/Validations.js'


export const signup_validate=joi.object({
    userName:joi.string().required().min(3),
    email:generalFields.email,
    password:generalFields.password,
    repassword:generalFields.cpassword,
    age:joi.number().min(11)

})
export const signin_validate=joi.object({
 
    email:generalFields.email,
    password:generalFields.password,
 

})
export const forgetpassword=joi.object({

    email:generalFields.email
})
export const confirmcode=joi.object({

    code:joi.number().min(4).required()
})
export const changepassword=joi.object({
    password:generalFields.password,
    repassword:generalFields.cpassword
})