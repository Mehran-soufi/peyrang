
import { PageLoading } from "@/components/shared/page-loading";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 bg-background">
      <PageLoading />
    </div>
  );
}
