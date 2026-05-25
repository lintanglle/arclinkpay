import Link from "next/link";
import { AppShell, Badge, Card, primaryButton } from "../components/app-shell";
import { paymentLinks } from "@/lib/mock-payments";

const paidLinks = paymentLinks.filter((payment) => payment.status === "paid");
const unpaidLinks = paymentLinks.filter((payment) => payment.status === "unpaid");
const totalReceived = paidLinks.reduce(
  (total, payment) => total + Number(payment.amount.replace(",", "")),
  0,
);

const stats = [
  { label: "Total received", value: `${totalReceived.toLocaleString()} USDC` },
  { label: "Total links", value: paymentLinks.length.toString() },
  { label: "Paid links", value: paidLinks.length.toString() },
  { label: "Unpaid links", value: unpaidLinks.length.toString() },
];

export default function DashboardPage() {
  return (
    <AppShell>
      <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-blue-700 dark:text-blue-300">
            Dashboard
          </p>
          <h1 className="mt-3 text-3xl font-semibold tracking-normal text-slate-950 dark:text-white sm:text-4xl">
            Payment links
          </h1>
          <p className="mt-3 max-w-2xl text-base leading-7 text-slate-600 dark:text-slate-300 sm:text-lg sm:leading-8">
            Monitor mock Arc USDC requests and payment status for the demo.
          </p>
        </div>
        <Link href="/create" className={primaryButton}>
          Create link
        </Link>
      </div>

      <section className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.label} className="min-h-32">
            <p className="text-sm text-slate-500 dark:text-slate-400">
              {stat.label}
            </p>
            <p className="mt-3 text-2xl font-semibold text-slate-950 dark:text-white sm:text-3xl">
              {stat.value}
            </p>
          </Card>
        ))}
      </section>

      <Card className="mt-8 overflow-hidden p-0">
        <div className="flex flex-col gap-1 border-b border-slate-200 px-5 py-5 dark:border-white/10 sm:px-6">
          <h2 className="text-lg font-semibold text-slate-950 dark:text-white">
            Recent links
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Mock payment requests for the public demo.
          </p>
        </div>
        {paymentLinks.length === 0 ? (
          <div className="px-5 py-10 text-center sm:px-6">
            <p className="font-medium text-slate-950 dark:text-white">
              No payment links yet
            </p>
            <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
              Create a mock request to preview the dashboard.
            </p>
          </div>
        ) : (
          <div className="hidden overflow-x-auto md:block">
            <table className="w-full min-w-[720px] text-left text-sm">
              <thead className="bg-slate-50 text-xs uppercase tracking-[0.08em] text-slate-500 dark:bg-white/5 dark:text-slate-400">
                <tr>
                  <th className="px-6 py-4 font-semibold">Title</th>
                  <th className="px-6 py-4 font-semibold">Amount</th>
                  <th className="px-6 py-4 font-semibold">Status</th>
                  <th className="px-6 py-4 font-semibold">Created</th>
                  <th className="px-6 py-4 font-semibold">Link</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-white/10">
                {paymentLinks.map((payment) => (
                  <tr
                    key={payment.id}
                    className="bg-white transition hover:bg-slate-50 dark:bg-transparent dark:hover:bg-white/5"
                  >
                    <td className="px-6 py-4 font-medium text-slate-950 dark:text-white">
                      <div>
                        <p>{payment.title}</p>
                        <p className="mt-1 text-xs font-normal text-slate-500 dark:text-slate-400">
                          {payment.id}
                        </p>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-slate-700 dark:text-slate-200">
                      {payment.amount} USDC
                    </td>
                    <td className="px-6 py-4">
                      <Badge
                        tone={payment.status === "paid" ? "success" : "warning"}
                      >
                        {payment.status}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 text-slate-600 dark:text-slate-300">
                      {payment.createdAt}
                    </td>
                    <td className="px-6 py-4">
                      <Link
                        href={`/pay/${payment.id}`}
                        className="rounded-lg px-3 py-2 font-semibold text-blue-700 transition hover:bg-blue-50 hover:text-blue-900 dark:text-blue-300 dark:hover:bg-blue-400/10 dark:hover:text-blue-100"
                      >
                        Open
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {paymentLinks.length > 0 ? (
          <div className="divide-y divide-slate-200 md:hidden dark:divide-white/10">
            {paymentLinks.map((payment) => (
              <div key={payment.id} className="space-y-4 px-5 py-5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="font-semibold text-slate-950 dark:text-white">
                      {payment.title}
                    </p>
                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                      {payment.createdAt}
                    </p>
                  </div>
                  <Badge tone={payment.status === "paid" ? "success" : "warning"}>
                    {payment.status}
                  </Badge>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <p className="text-sm text-slate-600 dark:text-slate-300">
                    <span className="font-semibold text-slate-950 dark:text-white">
                      {payment.amount}
                    </span>{" "}
                    USDC
                  </p>
                  <Link
                    href={`/pay/${payment.id}`}
                    className="rounded-lg border border-slate-300 px-3 py-2 text-sm font-semibold text-slate-900 transition hover:bg-slate-50 dark:border-white/15 dark:text-white dark:hover:bg-white/10"
                  >
                    Open
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : null}
      </Card>
    </AppShell>
  );
}
