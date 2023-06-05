import { NextRequest, NextResponse } from "next/server";
import { db } from "../_base";

export async function POST(req: NextRequest) {
  const body: { title: string } = await req.json();

  const books = await db.book.findMany({
    where: {
      title: {
        contains: body.title,
        mode: "insensitive",
      },
    },
    include: {
      publisher: true,
    },
  });

  if (books.length < 0) {
    return new NextResponse(JSON.stringify(null));
  }

  return new NextResponse(JSON.stringify(books));
}
