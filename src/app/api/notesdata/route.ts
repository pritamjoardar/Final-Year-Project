import { NextRequest,NextResponse } from "next/server";
import {ConnectDB}  from "../../utils/Connect"; 
import  Notes  from "../../../models/notes";
export async function GET(request:NextRequest){
    await  ConnectDB();
   const data = await Notes.find();
   return NextResponse.json({message:"Created",data},{status:200});    

}
