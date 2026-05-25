"use client";

import { useState } from "react";
import { useConnect, useConnection, useDisconnect } from "wagmi";
import { shortenAddress } from "@/lib/payments/format";

export function WalletButton({ compact = false }: { compact?: boolean }) {
  const { address, isConnected, isConnecting } = useConnection();
  const { connect, connectors, error, isPending } = useConnect();
  const { disconnect } = useDisconnect();
  const [localError, setLocalError] = useState("");
  const connector = connectors[0];

  async function handleConnect() {
    setLocalError("");

    if (!connector) {
      setLocalError("No injected EVM wallet found.");
      return;
    }

    connect({ connector });
  }

  if (isConnected) {
    return (
      <div className="flex items-center gap-2">
        <span className="rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-xs font-semibold text-emerald-800 dark:border-emerald-400/20 dark:bg-emerald-400/10 dark:text-emerald-100">
          {shortenAddress(address)}
        </span>
        <button
          type="button"
          onClick={() => disconnect()}
          className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs font-semibold text-slate-900 transition hover:bg-slate-50 dark:border-white/15 dark:bg-white/5 dark:text-white dark:hover:bg-white/10"
        >
          Disconnect
        </button>
      </div>
    );
  }

  return (
    <div className={compact ? "space-y-2" : "flex flex-col items-start gap-2"}>
      <button
        type="button"
        onClick={handleConnect}
        disabled={isPending || isConnecting}
        className="rounded-lg bg-slate-950 px-4 py-2 text-xs font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-200"
      >
        {isPending || isConnecting ? "Connecting..." : "Connect wallet"}
      </button>
      {localError || error ? (
        <p className="max-w-56 text-xs leading-5 text-amber-700 dark:text-amber-200">
          {localError || error?.message}
        </p>
      ) : null}
    </div>
  );
}
