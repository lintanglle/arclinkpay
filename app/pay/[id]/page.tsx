import { AppShell } from "../../components/app-shell";
import { PayRequest } from "./pay-request";

export default async function PayPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <AppShell>
      <div className="mx-auto max-w-2xl">
        <PayRequest id={id} />
      </div>
    </AppShell>
  );
}
