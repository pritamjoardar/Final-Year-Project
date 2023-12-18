import { NextResponse,NextRequest } from "next/server";
// @ts-ignore
import jwt from "jsonwebtoken";
export const getDataFromToken = (request: NextRequest)=>{
    try {
        const token = request.cookies.get('notes')?.value || '';
        const decoded = jwt.verify(token, process.env.KEY !);
        return decoded._id;
    } catch (error:any) {
        throw new Error(error.message);
    }
}