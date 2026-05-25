import { NextResponse } from "next/server";
import {
  getDataMode,
  getPaymentLink,
  updatePaymentStatus,
} from "@/lib/payments/store";
import type { PaymentStatus } from "@/lib/payments/types";

const allowedStatuses: PaymentStatus[] = ["unpaid", "paid", "expired"];

export async function GET(
  _request: Request,
  context: RouteContext<"/api/payment-links/[id]">,
) {
  const { id } = await context.params;
  const payment = await getPaymentLink(id);

  if (!payment) {
    return NextResponse.json(
      { dataMode: getDataMode(), payment: null },
      { status: 404 },
    );
  }

  return NextResponse.json({
    dataMode: getDataMode(),
    payment,
  });
}

export async function PATCH(
  request: Request,
  context: RouteContext<"/api/payment-links/[id]">,
) {
  const { id } = await context.params;
  const body = await request.json();
  const status = String(body.status) as PaymentStatus;

  if (!allowedStatuses.includes(status)) {
    return NextResponse.json(
      { error: "status must be unpaid, paid, or expired" },
      { status: 400 },
    );
  }

  const payment = await updatePaymentStatus(id, {
    status,
    payerAddress: body.payerAddress ? String(body.payerAddress) : undefined,
    txHash: body.txHash ? String(body.txHash) : undefined,
    paidAt: body.paidAt ? String(body.paidAt) : undefined,
  });

  if (!payment) {
    return NextResponse.json(
      { dataMode: getDataMode(), payment: null },
      { status: 404 },
    );
  }

  return NextResponse.json({
    dataMode: getDataMode(),
    payment,
  });
}
