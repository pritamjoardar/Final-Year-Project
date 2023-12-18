import jwt from "jsonwebtoken"
import Signup from "../models/signup";
export const Auth =async (req)=>{
    const cookie  = req.headers.cookie;
    if(!cookie) return null;
        const token = req.headers.cookie.split("=")[1];
        const decode = await jwt.verify(token,process.env.KEY);
        return await Signup.findById(decode._id)
}