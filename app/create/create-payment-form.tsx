import Link from "next/link";
import {
  fieldClass,
  primaryButton,
  secondaryButton,
} from "../components/app-shell";

export function CreatePaymentForm({
  generatedLink,
}: {
  generatedLink?: string;
}) {

  return (
    <form action="/create" className="space-y-5">
      <input type="hidden" name="generated" value="1" />
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="space-y-2">
          <span className="text-sm font-medium text-slate-700 dark:text-slate-200">
            Title
          </span>
          <input
            required
            name="title"
            placeholder="Arc grant milestone"
            className={fieldClass}
          />
        </label>
        <label className="space-y-2">
          <span className="text-sm font-medium text-slate-700 dark:text-slate-200">
            Amount in USDC
          </span>
          <input
            required
            min="0"
            step="0.01"
            type="number"
            name="amount"
            placeholder="1250.00"
            className={fieldClass}
          />
        </label>
      </div>

      <label className="space-y-2">
        <span className="text-sm font-medium text-slate-700 dark:text-slate-200">
          Recipient wallet address
        </span>
        <input
          required
          name="recipient"
          placeholder="0x8f4a2b6c..."
          className={`${fieldClass} font-mono text-sm placeholder:font-sans`}
        />
      </label>

      <label className="space-y-2">
        <span className="text-sm font-medium text-slate-700 dark:text-slate-200">
          Note
        </span>
        <textarea
          name="note"
          rows={4}
          placeholder="Add payment context for the payer."
          className={`${fieldClass} resize-none`}
        />
      </label>

      <label className="space-y-2">
        <span className="text-sm font-medium text-slate-700 dark:text-slate-200">
          Optional expiry date
        </span>
        <input
          type="date"
          name="expiry"
          className={fieldClass}
        />
      </label>

      <div className="flex flex-col gap-3 pt-1 sm:flex-row">
        <button
          type="submit"
          className={primaryButton}
        >
          Generate payment link
        </button>
        <Link href="/dashboard" className={secondaryButton}>
          Back to dashboard
        </Link>
      </div>

      {generatedLink ? (
        <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-4 shadow-sm dark:border-emerald-400/20 dark:bg-emerald-400/10">
          <p className="text-sm font-medium text-emerald-800 dark:text-emerald-100">
            Mock payment link generated
          </p>
          <div className="mt-3 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <code className="break-all rounded-lg bg-white px-3 py-2 text-sm text-slate-900 shadow-sm dark:bg-slate-950 dark:text-slate-100">
              {generatedLink}
            </code>
            <Link href={generatedLink} className={primaryButton}>
              Open link
            </Link>
          </div>
        </div>
      ) : null}
    </form>
  );
}
