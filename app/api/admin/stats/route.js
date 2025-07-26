import { NextResponse } from "next/server";
import { verifyToken, getSystemStats } from "@/utils/auth";

// Get system statistics (admin only)
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

    const stats = await getSystemStats(decoded.userId);
    return NextResponse.json({ stats });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 403 });
  }
}
