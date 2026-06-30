// app/api/auth/register/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { hashPassword } from '@/lib/auth';
import { z } from 'zod';

const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  name: z.string().optional(),
  role: z.enum(['CUSTOMER', 'COLLECTOR']).default('CUSTOMER'),
  phone: z.string().min(10, "Nomor tidak valid"), //
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = registerSchema.parse(body);

    const existingUser = await prisma.user.findUnique({
      where: { email: parsed.email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: 'Email sudah terdaftar' },
        { status: 400 }
      );
    }

    const hashedPassword = await hashPassword(parsed.password);

    const user = await prisma.user.create({
      data: {
        email: parsed.email,
        password: hashedPassword,
        name: parsed.name,
        role: parsed.role,
      },
      select: { id: true, email: true, name: true, role: true },
    });

    return NextResponse.json({ user }, { status: 201 });
  } catch (error) {
  if (error instanceof z.ZodError) {
    return NextResponse.json(
      {
        error: error.issues.map(issue => issue.message)
      },
      { status: 400 }
    );
  }

  console.error(error);

  return NextResponse.json(
    { error: 'Terjadi kesalahan server' },
    { status: 500 }
  );
}

}