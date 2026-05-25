"use client";

import { QueryClient } from "@tanstack/react-query";
import { defineChain, http } from "viem";
import { createConfig, injected } from "wagmi";
import { arcPaymentConfig } from "@/lib/arc/config";

export const arcPlaceholderChain = defineChain({
  id: arcPaymentConfig.chainId,
  name: "Arc",
  nativeCurrency: {
    decimals: arcPaymentConfig.usdcDecimals,
    name: "USDC",
    symbol: arcPaymentConfig.nativeCurrencySymbol,
  },
  rpcUrls: {
    default: {
      http: [arcPaymentConfig.rpcUrl],
      webSocket: [arcPaymentConfig.webSocketUrl],
    },
  },
  blockExplorers: {
    default: {
      name: "Arc Explorer",
      url: arcPaymentConfig.blockExplorerUrl,
    },
  },
});

export const wagmiConfig = createConfig({
  chains: [arcPlaceholderChain],
  connectors: [
    injected({
      shimDisconnect: true,
    }),
  ],
  transports: {
    [arcPlaceholderChain.id]: http(arcPaymentConfig.rpcUrl),
  },
  ssr: true,
});

export function createWalletQueryClient() {
  return new QueryClient();
}
