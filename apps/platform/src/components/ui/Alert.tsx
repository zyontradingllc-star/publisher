import { cn } from "@/lib/utils";

type AlertProps = {
  children: React.ReactNode;
  variant?: "info" | "success" | "warning" | "error";
  className?: string;
};

const styles = {
  info: "border-coral/30 bg-[#F0F5F1] text-ink",
  success: "border-green-200 bg-green-50 text-green-900",
  warning: "border-amber-200 bg-amber-50 text-amber-950",
  error: "border-red-200 bg-red-50 text-red-900",
};

export function Alert({ children, variant = "info", className }: AlertProps) {
  return (
    <div
      role="status"
      className={cn(
        "rounded-xl border px-4 py-3 text-sm leading-relaxed",
        styles[variant],
        className
      )}
    >
      {children}
    </div>
  );
}
