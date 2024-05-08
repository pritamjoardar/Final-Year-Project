// Import required modules
import { NextRequest, NextResponse } from "next/server";
import { ConnectDB } from "@/app/utils/Connect";
import Notes from "@/models/notes";


export async function POST(request: NextRequest) {
    try {
        // Connect to MongoDB
        await ConnectDB();

        // Parse incoming request body to extract note data
        const data = await request.json();
        const { author, author_name, title, tag, url, share, favorite, like, views, comments } = data;

        // Create a new note object
        
        const newNote = new Notes({
            author,
            author_name,
            title,
            tag,
            url,
            share,
            favorite,
            like,
            views,
            comments
        });

        // Save the note to MongoDB
        await newNote.save();
        // Return success response
        return NextResponse.json({ message: "Note saved successfully" });
    } catch (error) {
        // Handle errors 
        console.log(error);
        return NextResponse.json({message:error});
    }
}
