import slugify from "slugify";
import { CategoryCollections } from "../../../../Db/Collections/Category.js";
import Cloud from "../../../Utils/Cloud.js";
import { AsyncHandeler } from "../../../Utils/Error.js";


export const getAllCategory=AsyncHandeler(async(req,res,next)=>{
    const findCategory=await CategoryCollections.find({isDeleted:false}).select('name')
    return findCategory?res.status(200).json({message:"sucess",findCategory}):next(new Error('some thing wrong'))
})

export const createCategory=AsyncHandeler(async(req,res,next)=>{
     if(req.file){
       const {secure_url,public_id}=await Cloud.uploader.upload(req.file.path)
       req.body.image={secure_url,public_id}   
     }
    req.body.user=req.user._id;
    req.body.slug=slugify(req.body.name,' ')
        const createCategory=await CategoryCollections.create(req.body)
    return createCategory?res.status(201).json({message:"success",created:true,createCategory}):next(new Error('fail to create Category ',{cause:"400"}))

})

export const updateCategory=AsyncHandeler(async(req,res,next)=>{
    const {id}=req.params;
    const checkCategory=await CategoryCollections.findById(id)
    if(!checkCategory){
        return next(new Error('this category not exist please write corect id',{cause:"401"}))
    }
    if(req.file){
        const {secure_url,public_id}=await Cloud.uploader.upload(req.file.path)
        await Cloud.uploader.destroy(checkCategory.image.public_id)
      checkCategory.image={secure_url,public_id}   

    }
    if(req.body.name){
        checkCategory.name=req.body.name;
    checkCategory.slug=slugify(req.body.name,' ');
    }
    

    checkCategory.save()
    return checkCategory?res.status(200).json({message:"success",updated:true,checkCategory}):next(new Error('fail to update Category ',{cause:"400"}))

    
})


export const deleteCategory=AsyncHandeler(async(req,res,next)=>{
    const deleteCategory=await CategoryCollections.findByIdAndUpdate(req.params.id,{isDeleted:true},{new :true})
    return deleteCategory?res.status(200).json({message:"success",deleted:true,deleteCategory}):next(new Error('fail to delete Category ',{cause:"400"}))
})