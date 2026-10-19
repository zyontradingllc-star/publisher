/* Payload CMS root layout — own <html>, plus site header/footer inside body. */
import type { ServerFunctionClient } from "payload";
import config from "@payload-config";
import "@payloadcms/next/css";
import {
  handleServerFunctions,
  RootLayout,
} from "@payloadcms/next/layouts";
import React from "react";

import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { getCurrentProfile } from "@/lib/auth";
import { importMap } from "./cms/importMap";
import "./custom.css";
import "../globals.css";

type Args = {
  children: React.ReactNode;
};

const serverFunction: ServerFunctionClient = async function (args) {
  "use server";
  return handleServerFunctions({
    ...args,
    config,
    importMap,
  });
};

export default async function PayloadLayout({ children }: Args) {
  let profile = null;
  try {
    profile = await getCurrentProfile();
  } catch {
    profile = null;
  }

  return (
    <RootLayout config={config} importMap={importMap} serverFunction={serverFunction}>
      <div className="flex min-h-screen flex-col bg-warm-wash text-ink antialiased">
        <SiteHeader profile={profile} />
        <div className="min-h-0 flex-1">{children}</div>
        <SiteFooter />
      </div>
    </RootLayout>
  );
}
