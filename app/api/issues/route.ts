import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { createIssueSchema } from "../../validationSchemas";

export async function POST(req: NextRequest) {
  const body = await req.json();

  const val = createIssueSchema.safeParse(body);

  if (!val.success) {
    return NextResponse.json(val.error.format(), { status: 400 });
  }

  const newIssue = await prisma.issue.create({
    data: {
      title: val.data.title,
      description: val.data.description,
    },
  });

  return NextResponse.json(newIssue, {
    status: 201,
  });
}
