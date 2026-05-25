import type { PaymentLink } from "./types";

export const demoPaymentLinks: PaymentLink[] = [
  {
    id: "demo-payment",
    title: "Demo grant milestone",
    amount: "1,200.00",
    asset: "USDC",
    network: "Arc",
    recipientAddress: "0x8f4a0000000000000000000000000000000091c2",
    payerAddress: "0x1d7e000000000000000000000000000000004b20",
    status: "unpaid",
    createdAt: "2026-01-01T12:00:00.000Z",
    createdAtLabel: "Today",
    note: "Demo payment request for an Arc ecosystem milestone.",
    txHash:
      "0x9f2d7c4a88b13e5d44a7f1190c3e8f6a2b1d9027c7e4a9d1f2a6b8c3d5e0f41a",
  },
  {
    id: "design-sprint",
    title: "Demo design sprint",
    amount: "450.00",
    asset: "USDC",
    network: "Arc",
    recipientAddress: "0x8f4a0000000000000000000000000000000091c2",
    payerAddress: "0x6ae2000000000000000000000000000000009dd1",
    status: "paid",
    createdAt: "2025-12-29T12:00:00.000Z",
    createdAtLabel: "3 days ago",
    paidAt: "2025-12-29T12:05:00.000Z",
    paidAtLabel: "3 days ago",
    note: "Demo paid request for product design work.",
    txHash:
      "0x3b67a9fd22c4de781a46b29e8a1475520e71d997ae42f19c50d6f3c448ab12ee",
  },
  {
    id: "community-bounty",
    title: "Demo community bounty",
    amount: "95.00",
    asset: "USDC",
    network: "Arc",
    recipientAddress: "0x8f4a0000000000000000000000000000000091c2",
    payerAddress: "0x4c3b000000000000000000000000000000000a99",
    status: "paid",
    createdAt: "2025-12-25T12:00:00.000Z",
    createdAtLabel: "1 week ago",
    paidAt: "2025-12-25T12:08:00.000Z",
    paidAtLabel: "1 week ago",
    note: "Demo paid request for a community contribution.",
    txHash:
      "0xa847e12c66b90f3132e4bd8867bc5a5594a76130f92a78b66a45b882dc97ab34",
  },
];
