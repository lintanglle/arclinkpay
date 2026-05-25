export const ARC_CHAIN_ID_PLACEHOLDER = Number(
  process.env.NEXT_PUBLIC_ARC_CHAIN_ID ?? 504,
);

export const ARC_RPC_URL_PLACEHOLDER =
  process.env.NEXT_PUBLIC_ARC_RPC_URL || "https://example.invalid/arc-rpc";

export const ARC_USDC_TOKEN_ADDRESS_PLACEHOLDER =
  process.env.NEXT_PUBLIC_ARC_USDC_TOKEN_ADDRESS ||
  "0x0000000000000000000000000000000000000000";

export const ARC_BLOCK_EXPLORER_URL_PLACEHOLDER =
  process.env.NEXT_PUBLIC_ARC_BLOCK_EXPLORER_URL ||
  "https://explorer.arc.example";

export const ARC_NETWORK_NAME = "Arc";

export const arcPaymentConfig = {
  chainId: Number.isFinite(ARC_CHAIN_ID_PLACEHOLDER)
    ? ARC_CHAIN_ID_PLACEHOLDER
    : 504,
  rpcUrl: ARC_RPC_URL_PLACEHOLDER,
  usdcTokenAddress: ARC_USDC_TOKEN_ADDRESS_PLACEHOLDER,
  blockExplorerUrl: ARC_BLOCK_EXPLORER_URL_PLACEHOLDER,
  networkName: ARC_NETWORK_NAME,
} as const;
