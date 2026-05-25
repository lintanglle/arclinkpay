import Link from "next/link";
import { AppShell, Card, secondaryButton } from "../../components/app-shell";
import { getPaymentLink } from "@/lib/mock-payments";
import { PayCard } from "./pay-card";

export default async function PayPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ paid?: string }>;
}) {
  const { id } = await params;
  const { paid } = await searchParams;
  const payment = getPaymentLink(id);

  if (!payment) {
    return (
      <AppShell>
        <div className="mx-auto max-w-2xl">
          <Card>
            <div className="space-y-4 text-center">
              <p className="text-sm font-semibold uppercase tracking-[0.14em] text-blue-700 dark:text-blue-300">
                Payment unavailable
              </p>
              <h1 className="text-3xl font-semibold tracking-normal text-slate-950 dark:text-white">
                This mock link was not found
              </h1>
              <p className="mx-auto max-w-md leading-7 text-slate-600 dark:text-slate-300">
                Use the demo payment link or create a new mock request to
                preview the payer experience.
              </p>
              <div className="flex flex-col justify-center gap-3 sm:flex-row">
                <Link href="/pay/demo-payment" className={secondaryButton}>
                  Open demo payment
                </Link>
                <Link href="/create" className={secondaryButton}>
                  Create link
                </Link>
              </div>
            </div>
          </Card>
        </div>
      </AppShell>
    );
  }

  return (
    <AppShell>
      <div className="mx-auto max-w-2xl">
        <Card>
          <PayCard payment={payment} paid={paid === "1"} />
        </Card>
      </div>
    </AppShell>
  );
}
