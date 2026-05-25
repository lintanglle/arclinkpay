export type PreparedArcUsdcPayment = {
  recipientAddress: string;
  amount: string;
  tokenAddress: string;
  chain: string;
};

export type PaymentExecutionResult = {
  txHash: string;
};

export const ARC_NETWORK_PLACEHOLDER = "Arc";
export const ARC_USDC_TOKEN_PLACEHOLDER =
  "0x0000000000000000000000000000000000000000";

export async function simulateArcUsdcPayment(
  payment: PreparedArcUsdcPayment,
): Promise<PaymentExecutionResult> {
  // TODO: Replace this simulation with a real Arc USDC transfer using wagmi/viem.
  // The future implementation should call the USDC contract on Arc, wait for the
  // transaction hash, and then update payment status through the API.
  const seed = `${payment.recipientAddress}-${payment.amount}-${Date.now()}`;
  const encoded = Array.from(seed)
    .map((char) => char.charCodeAt(0).toString(16).padStart(2, "0"))
    .join("")
    .slice(0, 64)
    .padEnd(64, "0");

  return {
    txHash: `0x${encoded}`,
  };
}
