import connect from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextResponse } from "next/server";
import bcryptjs from "bcryptjs";

connect();

export async function POST(req) {
  try {
    const body = await req.json();
    const { username, email, password } = body;

    // Check if User Exists
    const user = await User.findOne({ email });

    if (user) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }

    //hash password
    const salt = await bcryptjs.genSalt(10);
    const hashedPasword = await bcryptjs.hash(password, salt);

    const newUser = new User({
      username,
      email,
      password: hashedPasword,
    });

    const savedUser = await newUser.save();

    return NextResponse.json({
      message: "User created succesfully",
      success: true,
      savedUser,
    });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
