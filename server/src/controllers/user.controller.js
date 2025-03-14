import ApiResponse from '../utils/apiResponse.js'
import ApiError from '../utils/apiError.js'
import AsyncHandler from '../utils/asyncHandler.js'
import { User } from '../models/users.model.js';

const registerController = AsyncHandler(async(req, res)=>{
    const {email, picture, name} = req.body;

    if([email].some((field)=>{field.trim() === ""})){
        throw new ApiError(400, "All field are required.")
    }
    const isUserExist = await User.findOne({email});
    if(isUserExist) res.json(new ApiResponse(200, "User was already registered."))
    
    const user = await User.create({
        email,
        picture,
        name
    });
    const createdUser = await User.findById(user._id)
    if(!createdUser) throw new ApiError(500, "Something went wrong.");

    return res.json(new ApiResponse(201, createdUser, "User is created succesfully."))

});

export {registerController};