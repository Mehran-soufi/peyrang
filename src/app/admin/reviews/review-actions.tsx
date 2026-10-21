
"use client";

import { useFormStatus } from "react-dom";

import { updateReviewStatus } from "./actions";

function ReviewActionButton({
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

export function ReviewActions({ reviewId }: { reviewId: string }) {
  return (
    <div className="flex flex-wrap gap-3">
      <form action={updateReviewStatus}>
        <input type="hidden" name="id" value={reviewId} />
        <input type="hidden" name="status" value="approved" />

        <ReviewActionButton status="approved">
          تأیید و انتشار
        </ReviewActionButton>
      </form>

      <form action={updateReviewStatus}>
        <input type="hidden" name="id" value={reviewId} />
        <input type="hidden" name="status" value="rejected" />

        <ReviewActionButton status="rejected">
          رد نقد
        </ReviewActionButton>
      </form>
    </div>
  );
}
