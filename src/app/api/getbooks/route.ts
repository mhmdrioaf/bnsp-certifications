import { NextResponse } from "next/server";
import { db } from "../_base";

export async function GET() {
  const books = await db.book.findMany({
    include: {
      publisher: true,
    },
  });

  if (books.length > 0) {
    return new NextResponse(JSON.stringify(books));
  }

  return new NextResponse(JSON.stringify(null));
}
