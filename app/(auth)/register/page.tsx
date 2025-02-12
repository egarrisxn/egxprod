import type { Metadata } from "next";
import Link from "next/link";
import UserAuth from "@/components/user-auth";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import generateMetadata from "@/utils/seo";

export const metadata: Metadata = generateMetadata({
  path: "/register",
  title: "Register | xprod",
  description: "Register and get started with xprod.",
});

export default function RegisterPage() {
  return (
    <section className="grid place-items-center">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl font-bold tracking-tight">
            Welcome in!
          </CardTitle>
          <CardDescription>Register your account to continue.</CardDescription>
        </CardHeader>
        <CardContent>
          <UserAuth formType="register" />
        </CardContent>
        <CardFooter className="flex flex-row justify-center gap-1 text-center">
          <p>Already have an account?</p>
          <Link
            href="/login"
            className="text-primary underline-offset-4 hover:underline"
          >
            Sign in!
          </Link>
        </CardFooter>
      </Card>
    </section>
  );
}
