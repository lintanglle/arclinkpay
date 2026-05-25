"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { WagmiProvider } from "wagmi";
import { createWalletQueryClient, wagmiConfig } from "@/lib/wallet/config";

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => createWalletQueryClient());

  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  );
}
