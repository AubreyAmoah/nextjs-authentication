import connect from "@/dbConfig/dbConfig";
import { NextResponse } from "next/server";
import User from "@/models/userModel";

connect();

export async function POST(req) {
  try {
    const body = await req.json();
    const { token } = body;

    console.log(token);

    const user = await User.findOne({
      verifyToken: token,
      verifyTokenExpiry: { $gt: Date.now() },
    });

    console.log(user);

    if (!user) {
      return NextResponse.json({ error: "Invalid token" }, { status: 400 });
    }

    user.isVerified = true;
    user.verifyToken = undefined;
    user.verifyTokenExpiry = undefined;
    await user.save();

    return NextResponse.json({
      message: "Email verified succesfully",
      success: true,
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
