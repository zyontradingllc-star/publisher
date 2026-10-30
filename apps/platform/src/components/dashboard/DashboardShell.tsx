import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { DashboardRightRail } from "@/components/dashboard/DashboardRightRail";
import { DashboardTabs } from "@/components/dashboard/DashboardTabs";
import type { Book } from "@/types/database";

type Props = {
  children: React.ReactNode;
  books?: Book[];
  /** Hide right rail on nested pages that need full width */
  showRightRail?: boolean;
  /** Home layout: full-width header (no left sidebar) */
  variant?: "default" | "home";
  /** Show Dashboard / My Books / Approved / Profile tabs (default on). */
  showTabs?: boolean;
};

export function DashboardShell({
  children,
  books = [],
  showRightRail = true,
  variant = "default",
  showTabs,
}: Props) {
  const isHome = variant === "home";
  // Home pages already put tabs under the profile photo/name.
  const tabsVisible = showTabs ?? !isHome;

  return (
    <div className="border-t border-sand bg-[#F4F1EA]">
      <div
        className={`mx-auto flex w-full gap-5 px-4 py-5 sm:px-6 lg:py-6 ${
          isHome ? "max-w-[1100px] flex-col" : "max-w-[1200px]"
        }`}
      >
        {isHome ? null : <DashboardSidebar />}
        <div className="min-w-0 flex-1 space-y-4">
          {tabsVisible ? <DashboardTabs /> : null}
          {children}
        </div>
        {!isHome && showRightRail ? (
          <DashboardRightRail books={books} />
        ) : null}
      </div>
    </div>
  );
}
