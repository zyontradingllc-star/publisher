import { redirect } from "next/navigation";

/** Same experience lives at /signup now */
export default function CreateFreeAccountRedirect() {
  redirect("/signup");
}
