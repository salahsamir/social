import mongoose, {Schema, Types, model} from'mongoose'


const postSchema=new Schema({
    title:{type:"string",required:true},
    discr:{type:"string"},
    user:{type:Types.ObjectId,ref:'User',required:true},
    image:[{type:Object}],
    like:[{type:Types.ObjectId,ref:'User'}],
    unlike:[{type:Types.ObjectId,ref:'User'}],
    numreact:{type:"number"},
    isDeleted:{type:"boolean",default:false},


},{timestamps:true})

export const PostCollections=mongoose.models.Post||model('Post',postSchema)