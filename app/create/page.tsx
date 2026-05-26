import { AppShell, Card } from "../components/app-shell";
import { CreatePaymentForm } from "./create-payment-form";
import { getDataMode } from "@/lib/payments/store";

export default function CreatePage() {
  return (
    <AppShell>
      <div className="mx-auto max-w-3xl">
        <div className="mb-8 space-y-3">
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-blue-700 dark:text-blue-300">
            New payment link
          </p>
          <h1 className="text-3xl font-semibold tracking-normal text-slate-950 dark:text-white sm:text-4xl">
            Create a USDC request
          </h1>
          <p className="text-base leading-7 text-slate-600 dark:text-slate-300 sm:text-lg sm:leading-8">
            Enter the payment details a payer should see before sending USDC on
            Arc Testnet. Payment completion requires a real Arc Testnet wallet
            transaction.
          </p>
        </div>
        <Card>
          <CreatePaymentForm dataMode={getDataMode()} />
        </Card>
      </div>
    </AppShell>
  );
}
