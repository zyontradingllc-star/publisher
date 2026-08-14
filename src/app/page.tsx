import type { Metadata } from "next";
import { homeSeo } from "@/content/site";
import HomePageClient from "./HomePageClient";

export const metadata: Metadata = {
  title: { absolute: homeSeo.title },
  description: homeSeo.description,
};

export default function HomePage() {
  return <HomePageClient />;
}
