"use client";

import { Button } from "@/components/ui/Button";
import { platformHref } from "@/lib/platform";

type SignupCtaProps = {
  className?: string;
  label?: string;
};

/**
 * Marketing site: send users to platform /signup which opens Google
 * (or the Create Account form). Same-origin proxy on localhost:3000.
 */
export function SignupCta({
  className = "",
  label = "Signup",
}: SignupCtaProps) {
  return (
    <Button href={platformHref("/signup?google=1")} className={className}>
      {label}
    </Button>
  );
}
