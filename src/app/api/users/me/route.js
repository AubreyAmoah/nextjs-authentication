import { getDataFromToken } from "@/helpers/getDataFromToken";

import { NextResponse } from "next/server";
import User from "@/models/userModel";

import connect from "@/dbConfig/dbConfig";

connect();

export async function GET(req) {
  try {
    const userID = await getDataFromToken(req);
    const user = await User.findOne({ _id: userID }).select("-password");
    return NextResponse.json({
      message: "User found",
      data: user,
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
