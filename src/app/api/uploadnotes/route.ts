import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary, UploadApiResponse } from "cloudinary"; // Importing UploadApiResponse for type checking

export async function POST(request: NextRequest) {
    const formData = await request.formData();

    if(!formData.has("file")) {
        return NextResponse.json({ error: "File not found in request" }, { status: 400 });
    }
   
    cloudinary.config({
        cloud_name: process.env.CLOUD_NAME, 
        api_key: process.env.API_KEY, 
        api_secret: process.env.API_SECRET
    });
    const file = formData.get("file") as File;
      console.log("File",file);

    try{
        const arrayBuffer = await file.arrayBuffer();
        const base64String = Buffer.from(arrayBuffer).toString("base64");        
        const result: UploadApiResponse = await cloudinary.uploader.upload(`data:${file.type};base64,${base64String}`, {
            folder: "uploads", 
        });
        return NextResponse.json({ url: result.secure_url }, { status: 200 });
    }  catch (error: any){
        console.error("Error uploading file to Cloudinary:", error);
        return NextResponse.json({ error: " Internal Server Error " }, { status: 500 });
    }
}
