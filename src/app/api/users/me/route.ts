import { getDataFromToken } from "@/helper/gettoken";
import Signup from "@/models/signup";
import { ConnectDB } from "@/app/utils/Connect";
import { NextRequest, NextResponse } from "next/server";
ConnectDB();

export async function GET(request:NextRequest){
    try {
        const userID = await getDataFromToken(request);
        const user = await Signup.findOne({_id:userID},{'password':0});
        // console.log(user);
        return NextResponse.json(user,{status:200});
    } catch (error:any) {
        return NextResponse.json({error:error.message},{status:400});
    }
}