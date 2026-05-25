export type PaymentStatus = "paid" | "unpaid";

export type PaymentLink = {
  id: string;
  title: string;
  amount: string;
  recipient: string;
  payer: string;
  status: PaymentStatus;
  createdAt: string;
  note: string;
  txHash: string;
  timestamp: string;
};

export const paymentLinks: PaymentLink[] = [
  {
    id: "demo-payment",
    title: "Arc grant milestone",
    amount: "1,250.00",
    recipient: "0x8f4a...91c2",
    payer: "0x1d7e...4b20",
    status: "unpaid",
    createdAt: "May 25, 2026",
    note: "Milestone 1 payment for ArcLinkPay MVP.",
    txHash: "0x9f2d7c4a88b13e5d44a7f1190c3e8f6a2b1d9027c7e4a9d1f2a6b8c3d5e0f41a",
    timestamp: "May 25, 2026, 10:34 PM",
  },
  {
    id: "design-sprint",
    title: "Design sprint invoice",
    amount: "420.00",
    recipient: "0x8f4a...91c2",
    payer: "0x6ae2...9dd1",
    status: "paid",
    createdAt: "May 21, 2026",
    note: "UI polish and payment-flow review.",
    txHash: "0x3b67a9fd22c4de781a46b29e8a1475520e71d997ae42f19c50d6f3c448ab12ee",
    timestamp: "May 21, 2026, 4:12 PM",
  },
  {
    id: "community-bounty",
    title: "Community bounty",
    amount: "85.50",
    recipient: "0x8f4a...91c2",
    payer: "0x4c3b...0a99",
    status: "paid",
    createdAt: "May 18, 2026",
    note: "Docs contribution bounty.",
    txHash: "0xa847e12c66b90f3132e4bd8867bc5a5594a76130f92a78b66a45b882dc97ab34",
    timestamp: "May 18, 2026, 9:48 AM",
  },
];

export function getPaymentLink(id: string) {
  return paymentLinks.find((payment) => payment.id === id);
}
