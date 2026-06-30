import { NextResponse } from "next/server";

export async function POST() {
  const response = NextResponse.json({ success: true });

  response.cookies.set("token", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",              // ⚠️ HARUS SAMA dengan login
    expires: new Date(0),   // 🔥 ini yang hapus cookie
  });

  return response;
}