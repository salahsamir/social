import mongoose, { Schema, Types, model } from "mongoose";
const categorySchema = new Schema(
  {
    name: {
      type: "string",
      required: true,
      lowercase: true,
   
    },
    slug: {
      type: "string",
      required: true,
      lowercase: true,
 
    },
    

    image: {
      type: "object",
    },
    user: { type: Types.ObjectId, ref: "User", required: true },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true,toJSON:{virtuals:true},toObject:{virtuals:true}}
);

categorySchema.virtual('subcategory',{
  localField:'_id',
  foreignField:'category',
  ref:'SubCategory'
})

export const CategoryCollections =
  mongoose.models.Category || model("Category", categorySchema);
