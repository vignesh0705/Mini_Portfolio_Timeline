import { NextResponse } from "next/server";
import { createUser, generateToken, initializeDatabase } from "@/utils/auth";

export async function POST(request) {
  try {
    // Initialize database with seed data
    await initializeDatabase();

    const { name, email, password } = await request.json();

    // Basic validation
    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: "Password must be at least 6 characters" },
        { status: 400 }
      );
    }

    const user = await createUser({ name, email, password });
    const token = generateToken(user.id);

    return NextResponse.json({
      user,
      token,
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
