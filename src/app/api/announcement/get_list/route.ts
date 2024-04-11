import { NextResponse } from "next/server";
import { ConnectDB } from "../../../utils/Connect";
import Announcement from "../../../../models/announcements.js";

export async function GET() {
    console.log("get announcement list api called")

    await ConnectDB();
    let results = await Announcement.find();

    return NextResponse.json({ message: "Announcement List", info: results }, { status: 201 });
}

