import { NextRequest,NextResponse } from "next/server";
import {ConnectDB}  from "../../../utils/Connect"; 
import Signup from  "../../../../models/signup.js";
export async function POST(request:NextRequest){
    await  ConnectDB();
    const Data = await request.json();
    const {name, email, password,value} = Data;
    const Email =await Signup.findOne({email});
   
    if(!name || !email || !password || !value){
    return NextResponse.json({message:"Filled the from correctly"},{status:400});     
    }else{
        if(!Email){
            const Data =new Signup({name,email,password,value});
            await Data.save();
            // console.log(Data,Email);
            return NextResponse.json({message:"Created"},{status:201});        
        }else{
            return NextResponse.json({message:"Email is already exist"},{status:400});     

        }         
    }
}

