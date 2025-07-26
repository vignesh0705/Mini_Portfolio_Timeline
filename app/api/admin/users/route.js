import { NextResponse } from "next/server";
import { verifyToken, getAllUsers, deleteUser } from "@/utils/auth";

// Get all users (admin only)
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

    const users = await getAllUsers(decoded.userId);
    return NextResponse.json({ users });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 403 });
  }
}

// Delete user (admin only)
export async function DELETE(request) {
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

    const { userId } = await request.json();
    const success = await deleteUser(decoded.userId, userId);

    if (success) {
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json(
        { error: "Failed to delete user" },
        { status: 400 }
      );
    }
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 403 });
  }
}
