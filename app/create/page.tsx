import { AppShell, Card } from "../components/app-shell";
import { CreatePaymentForm } from "./create-payment-form";

export default async function CreatePage({
  searchParams,
}: {
  searchParams: Promise<{ generated?: string }>;
}) {
  const { generated } = await searchParams;

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
            Arc. This demo generates a mock link only.
          </p>
        </div>
        <Card>
          <CreatePaymentForm
            generatedLink={generated ? "/pay/demo-payment" : undefined}
          />
        </Card>
      </div>
    </AppShell>
  );
}
