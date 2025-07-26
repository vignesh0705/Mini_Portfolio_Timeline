import { NextResponse } from "next/server";
import {
  authenticateUser,
  generateToken,
  initializeDatabase,
} from "@/utils/auth";

export async function POST(request) {
  try {
    // Initialize database with seed data
    await initializeDatabase();

    const { email, password } = await request.json();

    // Basic validation
    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    const user = await authenticateUser(email, password);
    const token = generateToken(user.id);

    return NextResponse.json({
      user,
      token,
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 401 });
  }
}
