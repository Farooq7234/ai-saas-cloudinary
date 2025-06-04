import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getAuth } from "@clerk/nextjs/server";


const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  try {
    const { userId } = getAuth(request);
    if (!userId) {
      return NextResponse.json(
        { error: "Missing Clerk user ID" },
        { status: 400 }
      );
    }

    const pdfs = await prisma.pdf.findMany({
      where: { UserId: userId },
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(pdfs);
  } catch (error) {
    return NextResponse.json(
      { error: "Error fetching PDFs" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
