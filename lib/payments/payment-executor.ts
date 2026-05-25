import type { Address, Hex } from "viem";
import {
  arcPaymentConfig,
  ARC_NETWORK_NAME,
  ARC_USDC_TOKEN_ADDRESS_PLACEHOLDER,
} from "@/lib/arc/config";
import { erc20TransferAbi, prepareErc20TransferArgs } from "@/lib/arc/erc20";

export type PreparedArcUsdcPayment = {
  recipientAddress: string;
  amount: string;
  tokenAddress: string;
  chain: string;
};

export type PaymentExecutionResult = {
  txHash: Hex;
};

export type PaymentExecutionRequest = {
  recipientAddress: Address;
  amount: string;
  tokenAddress?: Address;
  chainId?: number;
};

export type PaymentExecutor = (
  request: PaymentExecutionRequest,
) => Promise<PaymentExecutionResult>;

export type TransactionStatus = "pending" | "confirmed" | "failed" | "unknown";

export type TransactionStatusCheck = {
  txHash: Hex;
  status: TransactionStatus;
  blockExplorerUrl?: string;
};

export type TransactionStatusChecker = (
  txHash: Hex,
) => Promise<TransactionStatusCheck>;

export const ARC_NETWORK_PLACEHOLDER = ARC_NETWORK_NAME;
export const ARC_USDC_TOKEN_PLACEHOLDER = ARC_USDC_TOKEN_ADDRESS_PLACEHOLDER;

export function prepareArcUsdcTransfer(request: PaymentExecutionRequest) {
  return {
    abi: erc20TransferAbi,
    address: request.tokenAddress ?? arcPaymentConfig.usdcTokenAddress,
    args: prepareErc20TransferArgs({
      recipientAddress: request.recipientAddress,
      amount: request.amount,
    }),
    chainId: request.chainId ?? arcPaymentConfig.chainId,
  };
}

export const executeArcUsdcPayment: PaymentExecutor = async (request) => {
  prepareArcUsdcTransfer(request);

  // TODO: Replace this simulated executor with a real wallet transaction call.
  // The real implementation should use wagmi/viem writeContract with the ERC20
  // transfer ABI, Arc chain config, Arc USDC token address, and connected wallet.
  return simulateArcUsdcPayment({
    recipientAddress: request.recipientAddress,
    amount: request.amount,
    tokenAddress: request.tokenAddress ?? arcPaymentConfig.usdcTokenAddress,
    chain: ARC_NETWORK_NAME,
  });
};

export const checkArcTransactionStatus: TransactionStatusChecker = async (
  txHash,
) => {
  // TODO: Replace this with a real Arc transaction receipt lookup through viem.
  // The real checker should query Arc RPC, map receipt state to payment status,
  // and expose block explorer links once Arc explorer details are final.
  return {
    txHash,
    status: "confirmed",
    blockExplorerUrl: `${arcPaymentConfig.blockExplorerUrl}/tx/${txHash}`,
  };
};

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
