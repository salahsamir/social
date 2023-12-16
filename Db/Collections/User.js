import mongoose, { Schema, model } from "mongoose";
const userSchema = new Schema(
  {
    userName: {
      type: "string",
      required: true,
      lowercase: true,
    },
    email: {
      type: "string",
      required: true,
      lowercase: true,
      unique: true,
    },
    password: {
      type: "string",
      required: true,
    },
    image:{
type:"object"
    },
    age: Number,
    gender: {
      type: "string",
      default: "Male",
      enum: ["Male", "Female"],
    },
    confirmEmail:{
      type:Boolean,
      default:false
    }
  },
  { timestamps: true }
);

export const UserCollections=mongoose.models.User||model('User',userSchema)