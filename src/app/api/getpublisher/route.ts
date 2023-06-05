import { NextResponse } from "next/server";
import { db } from "../_base";

export async function GET() {
  const publisher = await db.publisher.findMany({
    include: {
      books: true,
    },
  });

  if (publisher.length > 0) {
    return new NextResponse(JSON.stringify(publisher));
  }

  return new NextResponse(JSON.stringify(null));
}
