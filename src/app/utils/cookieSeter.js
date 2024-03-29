import {serialize} from "cookie"
import jwt from "jsonwebtoken"
export const CookieSeter = (res,token,set)=>{
    res.headers.set("Set-Cookie",serialize("notes",set?token:"",{
        path:"/",
        httpOnly:true,
        maxAge:set?15*24*60*60*1000:0
    }))
}
export const GenerateToken = (_id)=>{
    return jwt.sign({_id},process.env.KEY)
}