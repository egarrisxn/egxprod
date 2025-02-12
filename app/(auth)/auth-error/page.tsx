import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function AuthErrorPage() {
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
        <Button asChild>
          <Link href="/">Return Home</Link>
        </Button>
      </div>
    </section>
  );
}
