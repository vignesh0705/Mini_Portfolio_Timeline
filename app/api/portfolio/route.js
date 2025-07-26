import { NextResponse } from "next/server";
import {
  verifyToken,
  getUserPortfolio,
  updateUserPortfolio,
} from "@/utils/auth";

// Get user's portfolio items
export async function GET(request) {
  try {
    const authHeader = request.headers.get("authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ error: "No token provided" }, { status: 401 });
    }

    const token = authHeader.substring(7);
    const decoded = verifyToken(token);

    if (!decoded) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    const portfolioItems = await getUserPortfolio(decoded.userId);
    return NextResponse.json({ items: portfolioItems });
  } catch (error) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

// Update user's portfolio items
export async function POST(request) {
  try {
    const authHeader = request.headers.get("authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ error: "No token provided" }, { status: 401 });
    }

    const token = authHeader.substring(7);
    const decoded = verifyToken(token);

    if (!decoded) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    const { items } = await request.json();
    const success = await updateUserPortfolio(decoded.userId, items);

    if (success) {
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json(
        { error: "Failed to update portfolio" },
        { status: 400 }
      );
    }
  } catch (error) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
