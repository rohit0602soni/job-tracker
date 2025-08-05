import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ message: "Not authenticated" }, { status: 401 });

  await prisma.job.delete({
    where: { id: params.id, userId: session.user.id }
  });

  return NextResponse.json({ message: "Deleted" });
}

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ message: "Not authenticated" }, { status: 401 });

  const { company, position, status } = await req.json();

  const updatedJob = await prisma.job.update({
    where: { id: params.id, userId: session.user.id },
    data: { company, position, status }
  });

  return NextResponse.json(updatedJob);
}
