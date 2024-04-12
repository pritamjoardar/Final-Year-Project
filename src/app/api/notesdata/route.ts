import { NextRequest,NextResponse } from "next/server";
import {ConnectDB}  from "../../utils/Connect"; 
import  Document  from "../../../models/Document";
export async function GET(request:NextRequest){
    await  ConnectDB();
   const data = await Document.find();
   return NextResponse.json({message:"Created",data},{status:200});    

}
