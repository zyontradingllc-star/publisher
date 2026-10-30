import { redirect } from "next/navigation";

export default function DashboardPostsRedirect() {
  redirect("/dashboard/approved");
}
