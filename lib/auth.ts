import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { cookies } from "next/headers"

const JWT_SECRET = process.env.JWT_SECRET || "supersecretkey"
const SALT_ROUNDS = 10

// HASH PASSWORD
export async function hashPassword(password: string) {
  return bcrypt.hash(password, SALT_ROUNDS)
}

// COMPARE PASSWORD
export async function comparePassword(
  password: string,
  hashedPassword: string
) {
  return bcrypt.compare(password, hashedPassword)
}

// GENERATE TOKEN
export function generateToken(payload: {
  id: string
  email: string
  role: string
}) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "7d" })
}

// VERIFY TOKEN (Typed)
export function verifyToken(token: string): {
  id: string
  email: string
  role: string
} {
  return jwt.verify(token, JWT_SECRET) as {
    id: string
    email: string
    role: string
  }
}

// SET COOKIE
export async function setAuthCookie(token: string) {
  const cookieStore = await cookies()

  cookieStore.set("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
  })
}

// REMOVE COOKIE
export async function removeAuthCookie() {
  const cookieStore = await cookies()
  cookieStore.delete("token")
}

// GET TOKEN FROM COOKIE
export async function getAuthTokenFromRequest() {
  const cookieStore = await cookies()
  return cookieStore.get("token")?.value
}
