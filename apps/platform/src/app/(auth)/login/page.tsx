import type { Metadata } from "next";
import { loginAction } from "@/app/actions/auth";
import { AuthForm } from "@/components/forms/AuthForm";

export const metadata: Metadata = {
  title: "Log in",
};

type PageProps = {
  searchParams: Promise<{ next?: string }>;
};

export default async function LoginPage({ searchParams }: PageProps) {
  const { next } = await searchParams;
  const nextPath = next && next.startsWith("/") ? next : "/dashboard";

  return <AuthForm mode="login" action={loginAction} nextPath={nextPath} />;
}
