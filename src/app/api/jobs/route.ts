import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ message: "Not authenticated" }, { status: 401 });

  const { company, position, status } = await req.json();

  const job = await prisma.job.create({
    data: {
      company,
      position,
      status,
      userId: session.user.id,
    },
  });

  return NextResponse.json(job);
}

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ message: "Not authenticated" }, { status: 401 });

  const jobs = await prisma.job.findMany({
    where: { userId: session.user.id },
    orderBy: { appliedDate: "desc" },
  });

  return NextResponse.json(jobs);
}
