import { NextRequest, NextResponse } from "next/server";
import { db } from "../_base";

export async function POST(req: NextRequest) {
  const body: { id: string } = await req.json();

  const response = await db.book.delete({
    where: {
      id: body.id,
    },
  });

  if (response) {
    return new NextResponse(JSON.stringify(response));
  }
}
