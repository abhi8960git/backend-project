import { asyncHandler } from "../utils/asycHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { UploadOnCloudinary } from "../utils/FileUpload.js";
import { create } from "domain";
import { ApiResponse } from "../utils/ApiResponse.js";
const registerUser = asyncHandler(async (req ,res)=>{
//  getUser Details fron frontend (userDetail )
// validation -> not empty
// check if user already exists -> using username and email  
// check for images , avatar
// upload them to cloudinary 
// create user object -> create entry in DB
// remove password and refresh token field from response 
// check for user creation -> null / return user

const {fullname,email , username , password } = req.body;
console.log("fullname", fullname);

if([fullname, email, username, password].some((field)=> field?.trim() === " ")){
    throw new ApiError(400, `All Field are complulsory`);
}

const existedUser = User.findOne({
    $or:[{username}, {email}]
})

if(existedUser){
    throw new ApiError(409, "User with Email or username already exists");
}

const avatarLocalPath = req.files?.avatar[0]?.path;

const coverImageLocalPath = req.files?.coverImage[0]?.path;

if(!avatarLocalPath){
    throw new ApiError(400 ,"Avatar File Required");
}

 const responseAvatar = await UploadOnCloudinary(avatarLocalPath);
 const responseCoverImage = await UploadOnCloudinary(coverImageLocalPath);

 if(!responseAvatar){
    throw new ApiError(400, "Avatar File Url missing");
}

 const user = await User.create({
    fullname, 
    avatar:responseAvatar.url,
    coverImage:coverImageLocalPath?.url || "",
    email,
    password,
    username: username.toLowerCase()
})

const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
)

if(!createdUser){
    throw new ApiError(500, "something Went Wrong when Registering");
}

return res.status(201).json(
    new ApiResponse(200,createdUser,"User Registerd Successfully")
)

})


export {registerUser};