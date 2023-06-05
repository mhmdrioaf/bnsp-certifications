import { NextRequest, NextResponse } from "next/server";
import { db } from "../_base";

export async function POST(req: NextRequest) {
  const body: Book = await req.json();

  const response = await db.book.create({
    data: {
      id: body.id,
      title: body.title,
      price: Number(body.price),
      stock: Number(body.stock),
      publisherId: body.publisherId,
      category: body.category!,
    },
  });

  if (response) {
    return new NextResponse(JSON.parse(JSON.stringify(response)));
  }
}
