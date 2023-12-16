import { UserCollections } from "../../../../Db/Collections/User.js";
import Cloud from "../../../Utils/Cloud.js";
import { AsyncHandeler } from "../../../Utils/Error.js";
import { Compare, Hash } from "../../../Utils/Hash&Compare.js";
import { VerifyToken } from "../../../Utils/Token.js";


export const GetProfile=AsyncHandeler(async(req,res,next)=>{
   const user=req.user;
   return  res.status(200).json({message:"success",user})

}
)

export const UpdatePassword=AsyncHandeler(async(req,res,next)=>{
   const {_id}=req.user;
   
   const {oldpassword,password,repassword}=req.body;
  
   const check=await UserCollections.findOne({_id})
  
   if(!check||!Compare({password:oldpassword,hash:check.password})){
      return next(new Error('this account not exist',{cause:404}))
   }
   const hash=Hash({password})
   check.password=hash;
   check.save();
   return res.status(200).json({message:"sucess",update:true,check})
})

export const addImage=AsyncHandeler(async(req,res,next)=>{
   if(!req.file){
      return next(new Error('select image please'))
   }
   const{secure_url,public_id}=await Cloud.uploader.upload(req.file.path,{folder:"user"})
   const update=await UserCollections.findByIdAndUpdate(req.user._id,{image:{secure_url,public_id}},{new :true})
   return res.status(200).json({message:"success",update})
})