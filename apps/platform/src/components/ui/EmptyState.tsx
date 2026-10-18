import { Button } from "@/components/ui/Button";

type EmptyStateProps = {
  title: string;
  description: string;
  actionHref?: string;
  actionLabel?: string;
};

export function EmptyState({
  title,
  description,
  actionHref,
  actionLabel,
}: EmptyStateProps) {
  return (
    <div className="mx-auto max-w-lg rounded-2xl border border-dashed border-sand bg-ivory/60 px-6 py-12 text-center">
      <h2 className="heading-display text-xl text-ink">{title}</h2>
      <p className="mt-3 text-forest-muted">{description}</p>
      {actionHref && actionLabel ? (
        <div className="mt-6 flex justify-center">
          <Button href={actionHref}>{actionLabel}</Button>
        </div>
      ) : null}
    </div>
  );
}
