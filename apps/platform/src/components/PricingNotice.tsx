import { Alert } from "@/components/ui/Alert";

export function PricingNotice({ className }: { className?: string }) {
  return (
    <Alert variant="info" className={className}>
      <p className="font-semibold">Free Access During Launch · Paid Plans Coming Soon</p>
      <p className="mt-1">
        Authors keep 100% of their book royalties. Future platform plans or
        subscription charges may be introduced separately, with advance notice.
      </p>
    </Alert>
  );
}
