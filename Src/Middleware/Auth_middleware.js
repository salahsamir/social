import { UserCollections } from "../../Db/Collections/User.js";
import { AsyncHandeler } from "../Utils/Error.js";
import { VerifyToken } from "../Utils/Token.js";

export const Auth_Middleware=AsyncHandeler(async(req,res,next) => {
    const {auth}=req.headers;
    if(!auth){
        return next(new Error('data not right please sign in log in',{cause:404}))
    } 
    if( !auth.startsWith(process.env.Bearer)){
        return next(new Error('Bearer key not valid',{cause:404}))
    }
   const token=auth.split(process.env.Bearer)[1]
   const {id}=VerifyToken(token)
//    console.log(id);
   const user=await UserCollections.findById(id)
   if(!user){
    return next(new Error(' this account not exist',{cause:404}))
   }
//    console.log(user);
   req.user=user
   return next()
})