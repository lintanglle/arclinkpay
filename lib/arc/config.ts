export const ARC_TESTNET_CHAIN_ID = Number(
  process.env.NEXT_PUBLIC_ARC_CHAIN_ID ?? 5042002,
);

export const ARC_TESTNET_RPC_URL =
  process.env.NEXT_PUBLIC_ARC_RPC_URL || "https://rpc.testnet.arc.network";

export const ARC_TESTNET_WS_URL =
  process.env.NEXT_PUBLIC_ARC_WS_URL || "wss://rpc.testnet.arc.network";

export const ARC_TESTNET_USDC_TOKEN_ADDRESS =
  process.env.NEXT_PUBLIC_ARC_USDC_TOKEN_ADDRESS ||
  "0x3600000000000000000000000000000000000000";

export const ARC_TESTNET_BLOCK_EXPLORER_URL =
  process.env.NEXT_PUBLIC_ARC_BLOCK_EXPLORER_URL ||
  "https://testnet.arcscan.app";

export const ARC_TESTNET_FAUCET_URL =
  process.env.NEXT_PUBLIC_ARC_FAUCET_URL || "https://faucet.circle.com";

export const ARC_NETWORK_NAME = "Arc Testnet";
export const ARC_NATIVE_CURRENCY_SYMBOL = "USDC";
export const ARC_USDC_DECIMALS = 6;

export const arcPaymentConfig = {
  chainId: Number.isFinite(ARC_TESTNET_CHAIN_ID) ? ARC_TESTNET_CHAIN_ID : 5042002,
  rpcUrl: ARC_TESTNET_RPC_URL,
  webSocketUrl: ARC_TESTNET_WS_URL,
  usdcTokenAddress: ARC_TESTNET_USDC_TOKEN_ADDRESS,
  usdcDecimals: ARC_USDC_DECIMALS,
  blockExplorerUrl: ARC_TESTNET_BLOCK_EXPLORER_URL,
  faucetUrl: ARC_TESTNET_FAUCET_URL,
  networkName: ARC_NETWORK_NAME,
  nativeCurrencySymbol: ARC_NATIVE_CURRENCY_SYMBOL,
} as const;
