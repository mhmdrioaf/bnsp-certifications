import { NextRequest, NextResponse } from "next/server";
import { db } from "../_base";

export async function POST(req: NextRequest) {
  const body: { id: string } = await req.json();

  const book = await db.book.findFirst({
    where: {
      id: body.id,
    },
    include: {
      publisher: true,
    },
  });

  if (!book) {
    return new NextResponse(JSON.stringify(null));
  }

  return new NextResponse(JSON.stringify(book));
}
