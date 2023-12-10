import Joi from "joi";
import { generalFields } from "../../Middleware/Validations.js";


export const updatePassowrd=Joi.object({
    oldpassword:generalFields.password,
    password:generalFields.password,
    repassword:generalFields.cpassword
})