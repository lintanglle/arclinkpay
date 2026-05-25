import { hasSupabaseServerEnv } from "@/lib/supabase/config";
import { demoPaymentLinks } from "./mock-data";
import type {
  CreatePaymentLinkInput,
  DataMode,
  PaymentLink,
  UpdatePaymentStatusInput,
} from "./types";

const payments = new Map<string, PaymentLink>(
  demoPaymentLinks.map((payment) => [payment.id, payment]),
);

export function getDataMode(): DataMode {
  return hasSupabaseServerEnv() ? "database-ready" : "mock-fallback";
}

export async function listPaymentLinks() {
  return Array.from(payments.values()).sort(
    (a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt),
  );
}

export async function getPaymentLink(id: string) {
  return payments.get(id) ?? null;
}

export async function createPaymentLink(input: CreatePaymentLinkInput) {
  const id = createReadableId(input.title);
  const payment: PaymentLink = {
    id,
    title: input.title,
    amount: input.amount,
    asset: "USDC",
    network: "Arc Testnet",
    recipientAddress: input.recipientAddress,
    note: input.note,
    status: "unpaid",
    createdAt: new Date().toISOString(),
    expiresAt: input.expiresAt || undefined,
  };

  payments.set(payment.id, payment);
  return payment;
}

export async function updatePaymentStatus(
  id: string,
  input: UpdatePaymentStatusInput,
) {
  const payment = payments.get(id);

  if (!payment) {
    return null;
  }

  const updated: PaymentLink = {
    ...payment,
    status: input.status,
    payerAddress: input.payerAddress ?? payment.payerAddress,
    txHash: input.txHash ?? payment.txHash,
    paidAt: input.paidAt ?? payment.paidAt,
  };

  payments.set(id, updated);
  return updated;
}

function createReadableId(title: string) {
  const slug = title
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
    .slice(0, 36);
  const suffix = crypto.randomUUID().slice(0, 8);

  return `${slug || "payment"}-${suffix}`;
}
