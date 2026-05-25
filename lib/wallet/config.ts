"use client";

import { QueryClient } from "@tanstack/react-query";
import { defineChain, http } from "viem";
import { createConfig, injected } from "wagmi";

const arcChainId = Number(process.env.NEXT_PUBLIC_ARC_CHAIN_ID ?? 504);
const arcRpcUrl = process.env.NEXT_PUBLIC_ARC_RPC_URL;

export const arcPlaceholderChain = defineChain({
  id: Number.isFinite(arcChainId) ? arcChainId : 504,
  name: "Arc",
  nativeCurrency: {
    decimals: 18,
    name: "Arc Gas Token",
    symbol: "ARC",
  },
  rpcUrls: {
    default: {
      http: [arcRpcUrl || "https://example.invalid/rpc"],
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
    [arcPlaceholderChain.id]: http(arcRpcUrl),
  },
  ssr: true,
});

export function createWalletQueryClient() {
  return new QueryClient();
}
