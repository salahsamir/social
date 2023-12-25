import joi from 'joi';
import { generalFields } from '../../Middleware/Validations.js';
export const createCategory=joi.object({
    name:joi.string().required(),
    file:generalFields.file
})
export const updateCategory=joi.object({
    name:joi.string().required(),
    file:generalFields.file,
    id:generalFields.id
})

export const deleteCategory=joi.object({
  
    id:generalFields.id
})