import { redirect } from "next/navigation";

/** Email signup is on the main Create Account form. */
export default function SignupEmailRedirect() {
  redirect("/signup");
}
