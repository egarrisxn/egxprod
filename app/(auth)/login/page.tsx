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

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Log In | xprod",
  description: "Log in and get started with xprod.",
};

export default function LogInPage() {
  return (
    <section className="grid place-items-center">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl font-bold tracking-tight">
            Welcome back!
          </CardTitle>
          <CardDescription>Log in to your account to continue.</CardDescription>
        </CardHeader>
        <CardContent>
          <UserAuth formType="login" />
        </CardContent>
        <CardFooter className="flex flex-row justify-center gap-1 text-center">
          <p>Don&apos;t have an account?</p>
          <Link
            href="/register"
            className="text-primary underline-offset-4 hover:underline"
          >
            Sign up!
          </Link>
        </CardFooter>
      </Card>
    </section>
  );
}
