import type { PaymentLink } from "./types";

export const demoPaymentLinks: PaymentLink[] = [
  {
    id: "demo-payment",
    title: "Arc grant milestone",
    amount: "1,250.00",
    asset: "USDC",
    network: "Arc",
    recipientAddress: "0x8f4a0000000000000000000000000000000091c2",
    payerAddress: "0x1d7e000000000000000000000000000000004b20",
    status: "unpaid",
    createdAt: "2026-05-25T15:34:00.000Z",
    note: "Milestone 1 payment for ArcLinkPay MVP.",
    txHash:
      "0x9f2d7c4a88b13e5d44a7f1190c3e8f6a2b1d9027c7e4a9d1f2a6b8c3d5e0f41a",
  },
  {
    id: "design-sprint",
    title: "Design sprint invoice",
    amount: "420.00",
    asset: "USDC",
    network: "Arc",
    recipientAddress: "0x8f4a0000000000000000000000000000000091c2",
    payerAddress: "0x6ae2000000000000000000000000000000009dd1",
    status: "paid",
    createdAt: "2026-05-21T09:12:00.000Z",
    paidAt: "2026-05-21T09:16:00.000Z",
    note: "UI polish and payment-flow review.",
    txHash:
      "0x3b67a9fd22c4de781a46b29e8a1475520e71d997ae42f19c50d6f3c448ab12ee",
  },
  {
    id: "community-bounty",
    title: "Community bounty",
    amount: "85.50",
    asset: "USDC",
    network: "Arc",
    recipientAddress: "0x8f4a0000000000000000000000000000000091c2",
    payerAddress: "0x4c3b000000000000000000000000000000000a99",
    status: "paid",
    createdAt: "2026-05-18T02:48:00.000Z",
    paidAt: "2026-05-18T02:52:00.000Z",
    note: "Docs contribution bounty.",
    txHash:
      "0xa847e12c66b90f3132e4bd8867bc5a5594a76130f92a78b66a45b882dc97ab34",
  },
];
