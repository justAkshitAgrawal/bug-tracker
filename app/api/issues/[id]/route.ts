import { patchIssueSchema } from "@/app/validationSchemas";
import prisma from "@/prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../auth/[...nextauth]/route";

interface Props {
  params: { id: string };
}

export async function PATCH(req: NextRequest, { params }: Props) {
  const body = await req.json();

  const validation = patchIssueSchema.safeParse(body);

  if (!validation.success) {
    return NextResponse.json(validation.error.format(), { status: 400 });
  }

  if (body.assignedToUserId) {
    const user = await prisma.user.findUnique({
      where: { id: body.assignedToUserId },
    });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
  }

  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!issue) {
    return NextResponse.json({ message: "Issue not found" }, { status: 404 });
  }

  const updated = await prisma.issue.update({
    where: { id: parseInt(params.id) },
    data: {
      title: body.title,
      description: body.description,
      assignedToUserId: body.assignedToUserId,
      status:
        body.status ||
        (body.assignedToUserId === null ? "OPEN" : "IN_PROGRESS"),
    },
  });

  return NextResponse.json(updated);
}

export async function DELETE(req: NextRequest, { params }: Props) {
  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  });

  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return NextResponse.json({ message: "Not authenticated" }, { status: 401 });
  }

  if (!issue) {
    return NextResponse.json({ message: "Issue not found" }, { status: 404 });
  }

  await prisma.issue.delete({
    where: { id: parseInt(params.id) },
  });

  return NextResponse.json({});
}
