import mongoose, { Schema, Types, model } from "mongoose";
const subcategorySchema = new Schema(
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
    category: { type: Types.ObjectId,ref:"Category",required:true },

  },
  { timestamps: true }
);

export const SubCategoryCollections =mongoose.models.subCategory || model("SubCategory", subcategorySchema);
