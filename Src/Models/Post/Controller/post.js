import { PostCollections } from "../../../../Db/Collections/Post.js";
import Cloud from "../../../Utils/Cloud.js";
import { AsyncHandeler } from "../../../Utils/Error.js";

export const GetPost=AsyncHandeler(async(req,res,next)=>{
    return res.status(200).json({message:"success"})
})
export const CreatePost=AsyncHandeler(async(req,res,next)=>{
    
    req.body.user=req.user._id;
   const images=[]
  for (const file of req.files.image) {
    if(file){
        const{secure_url,public_id}=await Cloud.uploader.upload(file.path,{folder:`/post/${req.user._id}`})
        images.push({secure_url,public_id})
    }
    
  }
 
    req.body.image=images
    const createPost=await PostCollections.create(req.body)
    return createPost?res.status(201).json({message:"success",createPost}):next(new Error('error in upload'))
})