import { AppShell, Card } from "../../components/app-shell";

export default function Loading() {
  return (
    <AppShell>
      <div className="mx-auto max-w-3xl">
        <Card>
          <div className="h-96 animate-pulse rounded-lg bg-slate-100 dark:bg-white/10" />
        </Card>
      </div>
    </AppShell>
  );
}
