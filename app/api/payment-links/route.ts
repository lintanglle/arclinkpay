import { NextResponse } from "next/server";
import {
  createPaymentLink,
  getDataMode,
  listPaymentLinks,
} from "@/lib/payments/store";

export async function GET() {
  const payments = await listPaymentLinks();

  return NextResponse.json({
    dataMode: getDataMode(),
    payments,
  });
}

export async function POST(request: Request) {
  const body = await request.json();

  if (!body.title || !body.amount || !body.recipientAddress) {
    return NextResponse.json(
      { error: "title, amount, and recipientAddress are required" },
      { status: 400 },
    );
  }

  const payment = await createPaymentLink({
    title: String(body.title),
    amount: String(body.amount),
    recipientAddress: String(body.recipientAddress),
    note: body.note ? String(body.note) : undefined,
    expiresAt: body.expiresAt ? String(body.expiresAt) : undefined,
  });

  return NextResponse.json(
    {
      dataMode: getDataMode(),
      payment,
    },
    { status: 201 },
  );
}
