import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function AuthVerifyPage() {
  return (
    <section className="grid place-items-center">
      <div className="mx-auto text-center">
        <h2 className="mb-5 text-2xl font-semibold text-black md:text-4xl dark:text-white">
          Check your email.
        </h2>
        <p>
          To confirm your email address, tap the link in the email we sent to
          you.
        </p>
        <Button asChild>
          <Link href="/">Return Home</Link>
        </Button>
      </div>
    </section>
  );
}
