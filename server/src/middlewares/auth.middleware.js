import jwt from 'jsonwebtoken';
import AsyncHandler from '../utils/asyncHandler.js';
import ApiError from '../utils/apiError.js';
import { User } from '../models/users.model.js';
import { jwtDecode } from "jwt-decode";

const verifyJWT = AsyncHandler(async(req, res, next)=>{
    const token = req.header("Authorization")?.replace("Bearer ","");
    if(!token) throw new ApiError(401, "Unauthorized without token");
    try{
        // const decodedToken = jwt.verify(token);
        const decodedToken = jwtDecode(token);
        console.log("cheeck decoded", decodedToken)
        const user = await User.find({email: decodedToken.email});

        if(!user) throw new ApiError(401, 'Unauthorized user');

        req.user = user;
        next();
    }
    catch(err){
        throw new ApiError(400, err?.message || 'Invalid access token');
    }
})

export default verifyJWT;