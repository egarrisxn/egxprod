"use client";
import * as React from "react";
import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  React.useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className="grid place-items-center">
      <div className="mx-auto text-center">
        <h2 className="mb-5 text-2xl font-semibold text-black md:text-4xl dark:text-white">
          There seems to be a problem.
        </h2>
        <p>
          If you believe there is a mistake, please send me an email at
          egarrisxn@gmail.com.
        </p>
        <Button onClick={() => reset()}>Try Again</Button>
      </div>
    </section>
  );
}
