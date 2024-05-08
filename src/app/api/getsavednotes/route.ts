import Notes from "@/models/notes";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request:NextRequest){
    try {
      let data=await Notes.find({}).populate("author");
      return NextResponse.json(data);        
    } catch (error:any) {
        return NextResponse.json({error:error.message},{status:400});
    }
}