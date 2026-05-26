"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import type { Address, Hex } from "viem";
import { isAddress } from "viem";
import {
  useConnection,
  useSwitchChain,
  useWaitForTransactionReceipt,
  useWriteContract,
} from "wagmi";
import { arcPaymentConfig } from "@/lib/arc/config";
import { shortenAddress } from "@/lib/payments/format";
import {
  ARC_NETWORK_PLACEHOLDER,
  ARC_USDC_TOKEN_PLACEHOLDER,
  prepareArcUsdcTransfer,
  simulateArcUsdcPayment,
} from "@/lib/payments/payment-executor";
import type { PaymentLink } from "@/lib/payments/types";
import {
  Badge,
  primaryButton,
  secondaryButton,
  WalletRequiredPanel,
} from "../../components/app-shell";
import { WalletButton } from "../../components/wallet-button";

type PaymentMode = "simulated" | "real";
type EthereumProvider = {
  request: (args: {
    method: string;
    params?: unknown[];
  }) => Promise<unknown>;
};

export function PayCard({ initialPayment }: { initialPayment: PaymentLink }) {
  const router = useRouter();
  const { address, chainId, isConnected } = useConnection();
  const { switchChainAsync, isPending: isSwitchingChain } = useSwitchChain();
  const { writeContractAsync, isPending: isSubmittingTransaction } =
    useWriteContract();
  const [payment, setPayment] = useState(initialPayment);
  const [paymentMode, setPaymentMode] = useState<PaymentMode>("simulated");
  const [isPaying, setIsPaying] = useState(false);
  const [isUpdatingAfterReceipt, setIsUpdatingAfterReceipt] = useState(false);
  const [submittedTxHash, setSubmittedTxHash] = useState<Hex>();
  const [error, setError] = useState("");
  const paid = payment.status === "paid";
  const isArcTestnet = chainId === arcPaymentConfig.chainId;
  const arcScanTxUrl = submittedTxHash
    ? `${arcPaymentConfig.blockExplorerUrl}/tx/${submittedTxHash}`
    : payment.txHash && payment.executionMode === "arc-testnet"
      ? `${arcPaymentConfig.blockExplorerUrl}/tx/${payment.txHash}`
      : undefined;
  const {
    isLoading: isConfirming,
    isSuccess: isConfirmed,
    isError: isConfirmationError,
    error: confirmationError,
  } = useWaitForTransactionReceipt({
    chainId: arcPaymentConfig.chainId,
    hash: submittedTxHash,
    query: {
      enabled: Boolean(submittedTxHash),
      retry: false,
    },
  });
  const visibleError =
    error ||
    (isConfirmationError
      ? confirmationError?.message ||
        "Transaction failed or could not be confirmed. Payment status remains unpaid."
      : "");

  const markPaymentPaid = useCallback(async (
    txHash: Hex,
    payerAddress: string,
    executionMode: "simulated" | "arc-testnet",
  ) => {
    const response = await fetch(`/api/payment-links/${payment.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        status: "paid",
        executionMode,
        payerAddress,
        txHash,
        paidAt: new Date().toISOString(),
      }),
    });
    const payload = await response.json();

    if (!response.ok) {
      throw new Error(payload.error || "Unable to update payment status.");
    }

    setPayment(payload.payment);
  }, [payment.id]);

  async function handleSimulatedPayment() {
    if (!isConnected || !address) {
      setError("Connect a wallet before simulating payment.");
      return;
    }

    setError("");
    setIsPaying(true);

    try {
      const result = await simulateArcUsdcPayment({
        recipientAddress: payment.recipientAddress,
        amount: payment.amount,
        tokenAddress: ARC_USDC_TOKEN_PLACEHOLDER,
        chain: ARC_NETWORK_PLACEHOLDER,
      });

      await markPaymentPaid(result.txHash, address, "simulated");
    } catch (caughtError) {
      setError(
        caughtError instanceof Error
          ? caughtError.message
          : "Unable to simulate payment.",
      );
    } finally {
      setIsPaying(false);
    }
  }

  async function handleRealPayment() {
    if (!isConnected || !address) {
      setError("Connect a wallet before paying on Arc Testnet.");
      return;
    }

    if (!isArcTestnet) {
      setError("Switch to Arc Testnet before sending a real testnet payment.");
      return;
    }

    if (!isAddress(payment.recipientAddress)) {
      setError("Recipient address is not a valid EVM address.");
      return;
    }

    const normalizedAmount = Number(payment.amount.replace(",", ""));
    if (!Number.isFinite(normalizedAmount) || normalizedAmount <= 0) {
      setError("Payment amount must be greater than 0 USDC.");
      return;
    }

    setError("");
    setSubmittedTxHash(undefined);

    try {
      const preparedTransfer = prepareArcUsdcTransfer({
        recipientAddress: payment.recipientAddress as Address,
        amount: payment.amount,
      });
      const txHash = await writeContractAsync({
        address: preparedTransfer.address as Address,
        abi: preparedTransfer.abi,
        functionName: "transfer",
        args: preparedTransfer.args,
        chainId: preparedTransfer.chainId,
      });

      setSubmittedTxHash(txHash);
    } catch (caughtError) {
      setError(
        formatWalletError(
          caughtError,
          "Transaction was rejected or failed before submission.",
        ),
      );
    }
  }

  async function handleSwitchToArcTestnet() {
    setError("");
    try {
      const ethereum = getEthereumProvider();

      if (!ethereum) {
        await switchChainAsync({ chainId: arcPaymentConfig.chainId });
        return;
      }

      try {
        await ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: toHexChainId(arcPaymentConfig.chainId) }],
        });
      } catch (switchError) {
        if (!isChainMissingError(switchError)) {
          throw switchError;
        }

        await ethereum.request({
          method: "wallet_addEthereumChain",
          params: [
            {
              chainId: toHexChainId(arcPaymentConfig.chainId),
              chainName: arcPaymentConfig.networkName,
              nativeCurrency: {
                name: "USDC",
                symbol: arcPaymentConfig.nativeCurrencySymbol,
                decimals: arcPaymentConfig.nativeCurrencyDecimals,
              },
              rpcUrls: [arcPaymentConfig.rpcUrl],
              blockExplorerUrls: [arcPaymentConfig.blockExplorerUrl],
            },
          ],
        });
      }
    } catch (caughtError) {
      setError(
        formatWalletError(
          caughtError,
          "Unable to switch or add Arc Testnet in your wallet.",
        ),
      );
    }
  }

  useEffect(() => {
    let isActive = true;

    async function updateAfterReceipt() {
      if (!isConfirmed || !submittedTxHash || !address || paid) {
        return;
      }

      setIsUpdatingAfterReceipt(true);
      try {
        await markPaymentPaid(submittedTxHash, address, "arc-testnet");
        if (isActive) {
          router.push(`/receipt/${payment.id}`);
        }
      } catch (caughtError) {
        if (isActive) {
          setError(
            caughtError instanceof Error
              ? caughtError.message
              : "Payment confirmed, but status update failed.",
          );
        }
      } finally {
        if (isActive) {
          setIsUpdatingAfterReceipt(false);
        }
      }
    }

    updateAfterReceipt();

    return () => {
      isActive = false;
    };
  }, [address, isConfirmed, markPaymentPaid, paid, payment.id, router, submittedTxHash]);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Badge tone={paid ? "success" : "warning"}>{payment.status}</Badge>
        <span className="text-sm text-slate-500 dark:text-slate-400">
          Payment ID: {payment.id}
        </span>
      </div>

      <div className="rounded-lg bg-slate-950 p-5 text-white sm:p-6">
        <p className="text-sm text-slate-400">Amount due</p>
        <p className="mt-2 text-4xl font-semibold leading-tight sm:text-5xl">
          {payment.amount}{" "}
          <span className="text-2xl text-slate-300">{payment.asset}</span>
        </p>
        <h1 className="mt-5 text-xl font-semibold tracking-normal text-white sm:text-2xl">
          {payment.title}
        </h1>
        <p className="mt-2 leading-7 text-slate-300">
          {payment.note || "No note provided."}
        </p>
      </div>

      <div className="grid gap-3">
        {[
          ["Recipient", shortenAddress(payment.recipientAddress)],
          ["Network", payment.network],
          ["Asset", payment.asset],
          ["Payer", shortenAddress(payment.payerAddress)],
          ["Status", payment.status],
          [
            "Mode",
            payment.executionMode === "arc-testnet"
              ? "Arc Testnet"
              : "Simulated demo",
          ],
        ].map(([label, value]) => (
          <div
            key={label}
            className="grid gap-1 rounded-lg bg-slate-50 px-4 py-3 text-sm dark:bg-white/5 sm:grid-cols-[7rem_1fr] sm:items-center"
          >
            <span className="text-slate-500 dark:text-slate-400">{label}</span>
            <span className="break-all font-medium text-slate-950 dark:text-white sm:text-right">
              {value}
            </span>
          </div>
        ))}
      </div>

      {!isConnected ? (
        <WalletRequiredPanel>
          <WalletButton compact />
        </WalletRequiredPanel>
      ) : null}

      <div className="rounded-lg border border-slate-200 bg-slate-50 p-4 dark:border-white/10 dark:bg-white/5">
        <p className="text-sm font-semibold text-slate-950 dark:text-white">
          Payment mode
        </p>
        <div className="mt-3 grid gap-2 sm:grid-cols-2">
          <button
            type="button"
            onClick={() => setPaymentMode("simulated")}
            className={`rounded-lg border px-4 py-3 text-left text-sm font-semibold transition ${
              paymentMode === "simulated"
                ? "border-blue-500 bg-blue-50 text-blue-900 dark:border-blue-300 dark:bg-blue-400/10 dark:text-blue-100"
                : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50 dark:border-white/10 dark:bg-slate-950/20 dark:text-slate-200 dark:hover:bg-white/10"
            }`}
          >
            Simulated demo
            <span className="mt-1 block text-xs font-normal">
              Safe fallback. No wallet transaction is sent.
            </span>
          </button>
          <button
            type="button"
            onClick={() => setPaymentMode("real")}
            className={`rounded-lg border px-4 py-3 text-left text-sm font-semibold transition ${
              paymentMode === "real"
                ? "border-emerald-500 bg-emerald-50 text-emerald-900 dark:border-emerald-300 dark:bg-emerald-400/10 dark:text-emerald-100"
                : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50 dark:border-white/10 dark:bg-slate-950/20 dark:text-slate-200 dark:hover:bg-white/10"
            }`}
          >
            Real Arc Testnet
            <span className="mt-1 block text-xs font-normal">
              Sends USDC on Arc Testnet only.
            </span>
          </button>
        </div>
      </div>

      {paymentMode === "real" && isConnected && !isArcTestnet ? (
        <div className="rounded-lg border border-amber-200 bg-amber-50 p-4 dark:border-amber-400/20 dark:bg-amber-400/10">
          <p className="text-sm font-semibold text-amber-900 dark:text-amber-100">
            Wrong network
          </p>
          <p className="mt-2 text-sm leading-6 text-amber-800 dark:text-amber-100/80">
            Switch your wallet to Arc Testnet before sending a real testnet USDC
            payment.
          </p>
          <button
            type="button"
            onClick={handleSwitchToArcTestnet}
            disabled={isSwitchingChain}
            className={`${secondaryButton} mt-3 disabled:cursor-not-allowed disabled:opacity-60`}
          >
            {isSwitchingChain ? "Switching..." : "Switch to Arc Testnet"}
          </button>
        </div>
      ) : null}

      {submittedTxHash ? (
        <div className="rounded-lg border border-blue-200 bg-blue-50 p-4 dark:border-blue-400/20 dark:bg-blue-400/10">
          <p className="text-sm font-semibold text-blue-900 dark:text-blue-100">
            {isConfirming
              ? "Transaction pending"
              : paid
                ? "Transaction confirmed"
                : "Transaction submitted"}
          </p>
          <a
            href={arcScanTxUrl}
            target="_blank"
            rel="noreferrer"
            className="mt-2 block break-all font-mono text-sm text-blue-800 underline underline-offset-4 dark:text-blue-100"
          >
            {submittedTxHash}
          </a>
        </div>
      ) : null}

      {paid && payment.txHash ? (
        <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-4 shadow-sm dark:border-emerald-400/20 dark:bg-emerald-400/10">
          <p className="text-sm font-medium text-emerald-800 dark:text-emerald-100">
            {payment.executionMode === "arc-testnet"
              ? "Arc Testnet payment confirmed"
              : "Simulated payment completed"}
          </p>
          {arcScanTxUrl ? (
            <a
              href={arcScanTxUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-2 block break-all font-mono text-sm text-emerald-900 underline underline-offset-4 dark:text-emerald-50"
            >
              {payment.txHash}
            </a>
          ) : (
            <code className="mt-2 block break-all text-sm text-emerald-900 dark:text-emerald-50">
              {payment.txHash}
            </code>
          )}
        </div>
      ) : null}

      {visibleError ? (
        <div className="rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900 dark:border-amber-400/20 dark:bg-amber-400/10 dark:text-amber-100">
          {visibleError}
        </div>
      ) : null}

      <div className="flex flex-col gap-3 sm:flex-row">
        {paymentMode === "simulated" ? (
          <button
            type="button"
            onClick={handleSimulatedPayment}
            disabled={!isConnected || paid || isPaying}
            className={`${primaryButton} disabled:cursor-not-allowed disabled:opacity-60`}
          >
            {paid
              ? "Payment completed"
              : isPaying
                ? "Simulating..."
                : "Simulate USDC payment"}
          </button>
        ) : (
          <button
            type="button"
            onClick={handleRealPayment}
            disabled={
              !isConnected ||
              !isArcTestnet ||
              paid ||
              isSubmittingTransaction ||
              isConfirming ||
              isUpdatingAfterReceipt
            }
            className={`${primaryButton} disabled:cursor-not-allowed disabled:opacity-60`}
          >
            {paid
              ? "Payment completed"
              : isSubmittingTransaction
                ? "Submitting..."
                : isConfirming || isUpdatingAfterReceipt
                  ? "Confirming..."
                  : "Pay on Arc Testnet"}
          </button>
        )}
        <Link href={`/receipt/${payment.id}`} className={secondaryButton}>
          View receipt
        </Link>
      </div>
    </div>
  );
}

function toHexChainId(chainId: number) {
  return `0x${chainId.toString(16)}`;
}

function getEthereumProvider() {
  if (typeof window === "undefined") {
    return null;
  }

  const maybeWindow = window as typeof window & {
    ethereum?: EthereumProvider;
  };

  return maybeWindow.ethereum ?? null;
}

function isChainMissingError(error: unknown) {
  return (
    typeof error === "object" &&
    error !== null &&
    "code" in error &&
    (error as { code: unknown }).code === 4902
  );
}

function formatWalletError(error: unknown, fallback: string) {
  if (
    typeof error === "object" &&
    error !== null &&
    "code" in error &&
    (error as { code: unknown }).code === 4001
  ) {
    return "Transaction rejected in wallet. Payment status remains unpaid.";
  }

  return error instanceof Error ? error.message : fallback;
}
