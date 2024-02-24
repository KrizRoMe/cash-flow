import { prisma } from "@/libs/prisma";
import { NextResponse } from "next/server";

export async function GET() : Promise<Response> {
  const data = await prisma.transaction.findMany()
  return NextResponse.json(data);
}

export async function POST(request: Request) : Promise<Response> {
  const {description, amount, date, type} = await request.json()

  const newTransaction = await prisma.transaction.create({
    data: {
      description,
      amount,
      date,
      type
    }
  })
  return NextResponse.json(newTransaction);
}