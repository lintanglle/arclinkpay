import Link from "next/link";
import { AppShell, Badge, Card, secondaryButton } from "../../components/app-shell";
import { getPaymentLink } from "@/lib/mock-payments";

export default async function ReceiptPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const payment = getPaymentLink(id);

  if (!payment) {
    return (
      <AppShell>
        <div className="mx-auto max-w-2xl">
          <Card>
            <div className="space-y-4 text-center">
              <p className="text-sm font-semibold uppercase tracking-[0.14em] text-blue-700 dark:text-blue-300">
                Receipt unavailable
              </p>
              <h1 className="text-3xl font-semibold tracking-normal text-slate-950 dark:text-white">
                This mock receipt was not found
              </h1>
              <p className="mx-auto max-w-md leading-7 text-slate-600 dark:text-slate-300">
                Open the demo receipt or return to the dashboard to view the
                current mock payment links.
              </p>
              <div className="flex flex-col justify-center gap-3 sm:flex-row">
                <Link href="/receipt/demo-payment" className={secondaryButton}>
                  Open demo receipt
                </Link>
                <Link href="/dashboard" className={secondaryButton}>
                  Dashboard
                </Link>
              </div>
            </div>
          </Card>
        </div>
      </AppShell>
    );
  }

  const rows = [
    ["Amount", `${payment.amount} USDC`],
    ["Network", "Arc"],
    ["Payer address", payment.payer],
    ["Recipient address", payment.recipient],
    ["Transaction hash", payment.txHash],
    ["Timestamp", payment.timestamp],
  ];

  return (
    <AppShell>
      <div className="mx-auto max-w-3xl">
        <Card>
          <div className="flex flex-col gap-5 border-b border-slate-200 pb-6 dark:border-white/10 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <Badge tone="success">Paid receipt</Badge>
              <h1 className="mt-4 text-2xl font-semibold tracking-normal text-slate-950 dark:text-white sm:text-3xl">
                {payment.title}
              </h1>
              <p className="mt-2 text-slate-600 dark:text-slate-300">
                Payment completed in USDC on Arc.
              </p>
            </div>
            <div className="sm:text-right">
              <p className="text-sm text-slate-500 dark:text-slate-400">Paid</p>
              <p className="mt-1 text-2xl font-semibold text-slate-950 dark:text-white sm:text-3xl">
                {payment.amount} USDC
              </p>
            </div>
          </div>

          <div className="mt-6 grid gap-3">
            {rows.map(([label, value]) => (
              <div
                key={label}
                className="grid gap-2 rounded-lg bg-slate-50 px-4 py-3 text-sm dark:bg-white/5 sm:grid-cols-[10rem_1fr]"
              >
                <span className="text-slate-500 dark:text-slate-400">{label}</span>
                <span className="break-all font-medium text-slate-950 dark:text-white">
                  {value}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Link href={`/pay/${payment.id}`} className={secondaryButton}>
              Back to payment
            </Link>
            <Link href="/dashboard" className={secondaryButton}>
              Dashboard
            </Link>
          </div>
        </Card>
      </div>
    </AppShell>
  );
}
