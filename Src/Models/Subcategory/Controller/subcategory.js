import slugify from "slugify";
import Cloud from "../../../Utils/Cloud.js";
import { AsyncHandeler } from "../../../Utils/Error.js";
import { SubCategoryCollections} from "../../../../Db/Collections/SubCategory.js";
import { CategoryCollections } from "../../../../Db/Collections/Category.js";


export const getAllsubCategory=AsyncHandeler(async(req,res,next)=>{
  console.log(req.params.id);
    const findsubCategory=await SubCategoryCollections.find({isDeleted:false,category:req.params.id})
    return findsubCategory?res.status(200).json({message:"sucess",findsubCategory}):next(new Error('some thing wrong'))

})

export const createsubCategory=AsyncHandeler(async(req,res,next)=>{
      const {id}=req.params;
      if(!id||!await CategoryCollections.findById(id)){
        return next(new Error('this category not exist'))
      }
      req.body.category=id
     if(req.file){
       const {secure_url,public_id}=await Cloud.uploader.upload(req.file.path)
       req.body.image={secure_url,public_id}   
     }
    req.body.user=req.user._id;
    req.body.slug=slugify(req.body.name,' ')
        const createsubCategory=await SubCategoryCollections.create(req.body)
    return createsubCategory?res.status(201).json({message:"success",created:true,createsubCategory}):next(new Error('fail to create subCategory ',{cause:"400"}))

})

export const updatesubCategory=AsyncHandeler(async(req,res,next)=>{
    const {id}=req.params;
    const checksubCategory=await SubCategoryCollections.findById(id)
    if(!checksubCategory){
        return next(new Error('this subcategory not exist please write corect id',{cause:"401"}))
    }
    if(req.file){
        const {secure_url,public_id}=await Cloud.uploader.upload(req.file.path)
        await Cloud.uploader.destroy(checksubCategory.image.public_id)
      checksubCategory.image={secure_url,public_id}   

    }
    if(req.body.name){
        checksubCategory.name=req.body.name;
    checksubCategory.slug=slugify(req.body.name,' ');
    }
    

    checksubCategory.save()
    return checksubCategory?res.status(200).json({message:"success",updated:true,checksubCategory}):next(new Error('fail to update subCategory ',{cause:"400"}))

    
})


export const deletesubCategory=AsyncHandeler(async(req,res,next)=>{
    const deletesubCategory=await SubCategoryCollections.findByIdAndUpdate(req.params.id,{isDeleted:true},{new :true})
    return deletesubCategory?res.status(200).json({message:"success",deleted:true,deletesubCategory}):next(new Error('fail to delete subCategory ',{cause:"400"}))
})