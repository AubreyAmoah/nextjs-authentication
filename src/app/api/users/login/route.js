import connect from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

connect();

export async function POST(req) {
  try {
    const body = await req.json();
    const { email, password } = body;

    // Check if User Exists
    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json(
        { error: "User does not exist" },
        { status: 400 }
      );
    }

    //check if password is correct
    const validPassword = await bcryptjs.compare(password, user.password);

    if (!validPassword) {
      return NextResponse.json({ error: "Invalid password" }, { status: 400 });
    }

    //create token data
    const tokenData = {
      id: user._id,
      username: user.username,
      email: user.email,
    };

    //create token
    const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET, {
      expiresIn: "1d",
    });

    const res = NextResponse.json({
      message: "Login successful",
      success: true,
    });

    res.cookies.set("token", token, {
      httpOnly: true,
    });

    return res;
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
