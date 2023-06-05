import { NextRequest, NextResponse } from "next/server";
import { db } from "../_base";

interface RequestBody {
  id: string;
  title?: string;
  price?: number;
  stock?: number;
  publisherId?: string;
}

export async function POST(req: NextRequest) {
  const body: RequestBody = await req.json();

  const response = await db.book.update({
    where: {
      id: body.id,
    },
    data: {
      title: body.title,
      price: Number(body.price),
      stock: Number(body.stock),
      publisherId: body.publisherId,
    },
  });

  if (response) {
    return new NextResponse(JSON.stringify(response));
  }
}
