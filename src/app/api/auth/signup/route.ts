import { PrismaClient } from "@/generated/prisma";
import { hash } from "bcryptjs";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  const { email, password } = await req.json();

  // check if user already exists
  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) {
    return NextResponse.json({ error: "User already exists" }, { status: 400 });
  }

  // hash password
  const hashedPassword = await hash(password, 10);

  // create user
  const user = await prisma.user.create({
    data: {
      email,
      password: hashedPassword
    }
  });

  return NextResponse.json({ user });
}
