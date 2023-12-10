import { log } from "console";
import { AsyncHandeler } from "../../../Utils/Error.js";
import { UserCollections } from "../../../../Db/Collections/User.js";
import { Hash, Compare } from "../../../Utils/Hash&Compare.js";
import { GenerateToken, VerifyToken } from "../../../Utils/Token.js";
import sendEmail from "../../../Utils/SendEmail.js";
export const get = async (req, res, next) => {
  const user = await UserCollections.find();
  return res.json({ message: "done", user });
};

//create new user
export const Signup = AsyncHandeler(async (req, res, next) => {
  const { email, password, repassword } = req.body;

  if (await UserCollections.findOne({ email })) {
    return next(new Error(" email already exist ", { cause: 403 }));
  }
  const token = GenerateToken({ email });
  const link = `${req.protocol}://${req.headers.host}/auth/confirm/${token}`;
  // console.log(link)
  const send = await sendEmail({
    to: email,
    subject: " confirm email",
    html:`<html>
    <head>
        <meta charset="UTF-8">
        <title>Email Confirmation</title>
        <style>
            /* Add your custom CSS styles here */
            /* Example styles: */
            body {
                font-family: Arial, sans-serif;
                background-color: #f8f8f8;
                padding: 20px;
            }
            .container {
                max-width: 600px;
                margin: 0 auto;
                background-color: white;
                padding: 20px;
                border-radius: 5px;
                box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
            }
            h1 {
                color: #333;
            }
            p {
                color: #777;
            }
            .button {
                display: inline-block;
                padding: 10px 20px;
                background-color: #green;
                color: white;
                text-decoration: none;
                border-radius: 4px;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <h1>Email Confirmation</h1>
            <p>Please click the button below to confirm your email address:</p>
            <a class="button"  href=${link}>Confirm Email</a>
        </div>
    </body>
    </html>`
    
  });
  if (!send) {
    return res.json({ message: "rejected this email" });
  }

  const hash = Hash({ password });
  req.body.password = hash;
  const create = await UserCollections.create(req.body);
  return create
    ? res.status(201).json({ message: "success",ms:"please confirm email", created: true, })
    : next(new Error("some thing error"));
});
export const ConfirmEmail=AsyncHandeler(async(req,res,next)=>{
  const {email}=VerifyToken(req.params.token)
  const user=await UserCollections.findOne({email})
  if(!user){
    return next(new Error('this account not exist',{cause:404}))
  }
  user.confirmEmail=true;
  user.save()
  return res.status(200).redirect('https://poe.com/chat/2t51cqa48p6b2tn5zxk')
})
export const SignIn = AsyncHandeler(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await UserCollections.findOne({ email });
  if (!user) {
    return next(new Error(" email not exist ", { cause: 403 }));
  }
  if(!user.confirmEmail){
    return next(new Error("please confirm your email", { cause: 403 }));
  }
  const compare = Compare({ password, hash: user.password });
  if (!compare) {
    return next(new Error("password wrong "));
  }
  const token = GenerateToken({ email, id: user._id });
  return token
    ? res.status(200).json({ message: "success", token })
    : next(new Error("fail to log in "));
});

// send email to forget password
export const ForgetPassword=AsyncHandeler(async(req,res,next)=>{
  const {email}=req.body;
  const checkUser=await UserCollections.findOne({email})
  if(!checkUser){
    return next(new Error('this account not exist',{cause:404}))
  }
  const min = 1000; // Minimum four-digit number
  const max = 9999; // Maximum four-digit number

  const code=Math.floor(Math.random() * (max - min + 1) + min)
  
  const token = GenerateToken({ email,code });
  // const link = `${req.protocol}://${req.headers.host}/auth/confirmCode/${token}`;
 
  const send = await sendEmail({
    to: email,
    subject: " confirm email",
    html:`<html>
    <head>
        <meta charset="UTF-8">
        <title>Email Confirmation</title>
        <style>
            /* Add your custom CSS styles here */
            /* Example styles: */
            body {
                font-family: Arial, sans-serif;
                background-color: #f8f8f8;
                padding: 20px;
            }
            .container {
                max-width: 600px;
                margin: 0 auto;
                background-color: white;
                padding: 20px;
                border-radius: 5px;
                box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
            }
            h1 {
                color: #333;
            }
            p {
                color: #777;
            }
            .button {
                display: inline-block;
                padding: 20px 20px;
                background-color: green;
               
                color: white;
                text-decoration: none;
                border-radius: 4px;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <h1>Code</h1>
            <p>Please  write the right code:</p>
            <h1 class="button" >${code}</h1>
        </div>
    </body>
    </html>`
    
  });
  if (!send) {
    return res.json({ message: "rejected this email" });
  }
  return res.status(200).json({ message:"success",confirmCode:token})
})
export const ConfirmCode=AsyncHandeler(async(req,res,next)=>{
  const {email,code}=VerifyToken(req.headers.token)
  // log(code )
  if(code!=req.body.code){
    return next(new Error('please wright correct code',{cause:400}))
  }
  const token = GenerateToken({ email });
  return res.status(200).json({message:"success",token})

})
export const ChangePassword=AsyncHandeler(async(req,res,next)=>{
  const {email}=VerifyToken(req.headers.token)
  const {password}=req.body
  const user=await UserCollections.findOne({email})
  const hash=Hash({password})
  user.password=hash;
  user.save();
  return res.status(200).json({message:"success",update:true})

})