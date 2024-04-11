import { NextRequest, NextResponse } from "next/server";
import { ConnectDB } from "../../../utils/Connect";
import Announcement from "../../../../models/announcements.js";

export async function POST(request: NextRequest) {
    await ConnectDB();

    const { announcement_text } = await request.json();

    if (!announcement_text) {
        return NextResponse.json({ message: "Announcement text is required" }, { status: 400 });
    } 
        
    const Data = new Announcement({ announcement_text });
    await Data.save();

    return NextResponse.json({ message: "Announcement created" }, { status: 201 });
}

