import { Hero } from "@/components/landing/hero";
import { Features } from "@/components/landing/features";
import { Examples } from "@/components/landing/examples";
import { CallToAction } from "@/components/landing/call-to-action";

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
