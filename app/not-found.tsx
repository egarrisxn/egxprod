import Link from "next/link";
import { Button } from "@/components/ui/button";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Not Found",
};

export default function NotFoundPage() {
  return (
    <main className="mn-h-screen p-4">
      <section className="grid place-items-center">
        <div className="mx-auto text-center">
          <h2 className="mb-5 text-2xl font-semibold text-black md:text-4xl dark:text-white">
            This page seems to have dissapeared.
          </h2>
          <p>
            If you believe there is a mistake, please send me an email at
            egarrisxn@gmail.com.
          </p>
          <Button asChild>
            <Link href="/">Return Home</Link>
          </Button>
        </div>
      </section>
    </main>
  );
}
