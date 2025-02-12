import * as React from "react";
import { Hero } from "@/components/landing/hero";
import { Features } from "@/components/landing/features";
import { Examples } from "@/components/landing/examples";
import { CallToAction } from "@/components/landing/call-to-action";
import generateMetadata from "@/utils/seo";
import type { Metadata } from "next";

export const metadata: Metadata = generateMetadata({
  path: "/",
  title: "xprod",
  description: "All-In-One Productivity Application.",
});

export default function PublicHomePage() {
  return (
    <div className="mx-auto flex w-full flex-col">
      <Hero />
      <Features />
      <Examples />
      <CallToAction />
    </div>
  );
}
