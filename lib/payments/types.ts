export type PaymentStatus = "unpaid" | "paid" | "expired";
export type PaymentExecutionMode = "simulated" | "arc-testnet";

export type PaymentLink = {
  id: string;
  title: string;
  amount: string;
  asset: "USDC";
  network: "Arc Testnet";
  recipientAddress: string;
  payerAddress?: string;
  note?: string;
  status: PaymentStatus;
  executionMode?: PaymentExecutionMode;
  txHash?: string;
  createdAt: string;
  createdAtLabel?: string;
  paidAt?: string;
  paidAtLabel?: string;
  expiresAt?: string;
};

export type CreatePaymentLinkInput = {
  title: string;
  amount: string;
  recipientAddress: string;
  note?: string;
  expiresAt?: string;
};

export type UpdatePaymentStatusInput = {
  status: PaymentStatus;
  executionMode?: PaymentExecutionMode;
  payerAddress?: string;
  txHash?: string;
  paidAt?: string;
};

export type DataMode = "mock-fallback" | "database-ready";
