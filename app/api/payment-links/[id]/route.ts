import { NextResponse } from "next/server";
import {
  getDataMode,
  getPaymentLink,
  updatePaymentStatus,
} from "@/lib/payments/store";
import type { PaymentStatus } from "@/lib/payments/types";
import type { PaymentExecutionMode } from "@/lib/payments/types";

const allowedStatuses: PaymentStatus[] = ["unpaid", "paid", "expired"];
const allowedExecutionModes: PaymentExecutionMode[] = [
  "simulated",
  "arc-testnet",
];

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
  const executionMode = body.executionMode
    ? (String(body.executionMode) as PaymentExecutionMode)
    : undefined;

  if (!allowedStatuses.includes(status)) {
    return NextResponse.json(
      { error: "status must be unpaid, paid, or expired" },
      { status: 400 },
    );
  }

  if (executionMode && !allowedExecutionModes.includes(executionMode)) {
    return NextResponse.json(
      { error: "executionMode must be simulated or arc-testnet" },
      { status: 400 },
    );
  }

  const payment = await updatePaymentStatus(id, {
    status,
    executionMode,
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
