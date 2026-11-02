
"use client";

import { useFormStatus } from "react-dom";
import { updateContributionStatus } from "./actions";

function ContributionActionButton({
  status,
  children,
}: {
  status: "approved" | "rejected";
  children: React.ReactNode;
}) {
  const { pending } = useFormStatus();

  const isApprove = status === "approved";

  return (
    <button
      type="submit"
      disabled={pending}
      className={`rounded-lg px-4 py-2 text-sm font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-50 ${
        isApprove
          ? "bg-green-600 text-white hover:bg-green-700"
          : "border border-red-500/30 text-red-600 hover:bg-red-500/10"
      }`}
    >
      {pending
        ? "در حال ثبت..."
        : children}
    </button>
  );
}

export function ContributionActions({
  contributionId,
}: {
  contributionId: string;
}) {
  return (
    <div className="flex flex-wrap gap-3">
      <form action={updateContributionStatus}>
        <input type="hidden" name="id" value={contributionId} />
        <input type="hidden" name="status" value="approved" />

        <ContributionActionButton status="approved">
          تأیید مشارکت
        </ContributionActionButton>
      </form>

      <form action={updateContributionStatus}>
        <input type="hidden" name="id" value={contributionId} />
        <input type="hidden" name="status" value="rejected" />

        <ContributionActionButton status="rejected">
          رد مشارکت
        </ContributionActionButton>
      </form>
    </div>
  );
}
