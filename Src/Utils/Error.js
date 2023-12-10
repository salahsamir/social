export const AsyncHandeler=(fn)=>{
    return (req,res,next)=>{
        fn(req,res,next).catch(error=>{
            return res.status(500).json({message:'errorhandel',error:error.message})
        })
    }
}
export const GlobalError=(err,req,res,next)=>{
    if(err){
        return res.status(500||err.cause).json({message:"global error",err:err.message})
    }
    return res.status(500).json({message:"global error",err:err.message})
}