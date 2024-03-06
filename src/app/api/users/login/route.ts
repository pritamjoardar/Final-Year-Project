import { NextRequest,NextResponse } from "next/server";
import {ConnectDB}  from "../../../utils/Connect"; 
import Signup from  "../../../../models/signup.js";
import { CookieSeter, GenerateToken } from "../../../utils/cookieSeter";
export async function POST(request:NextRequest){
    await  ConnectDB();
    const Data = await request.json();
    const {email, password} = Data;
    const Email =await Signup.findOne({email});
   
    if(!email || !password ){
    return NextResponse.json({message:"Filled the from correctly"},{status:400});     
    }else{
        if(!Email){
            return NextResponse.json({message:"Invalid Credentials"},{status:401});    
        }
       else if(password!=Email.password){          
            return NextResponse.json({message:"Invalid Credentials"},{status:401});    
        }
        else if (Email && password===Email.password){
            const token = GenerateToken(Email._id);
            const res =  NextResponse.json({message:"Created"},{status:201});    
            CookieSeter(res,token,true)  ;
            return res;
        }         
    }
}

