"use client";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  signInWithEmail,
  signUpWithEmail,
  authWithGoogle,
  authWithGitHub,
} from "@/app/actions/auth";
import { formSchema, type formValueType } from "@/utils/schema";
import { Form } from "@/components/ui/form";
import { InputForm } from "@/components/ui/input-form";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const defaultValues: formValueType = {
  email: "",
  password: "",
};

type AuthFormProps = {
  formType: "login" | "register";
};

export default function UserAuth({ formType }: AuthFormProps) {
  const form = useForm<formValueType>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const handleSubmit = formType === "login" ? signInWithEmail : signUpWithEmail;
  const buttonText = formType === "login" ? "Sign In" : "Sign Up";

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="flex w-full flex-col gap-y-4 pb-4"
        >
          <InputForm
            label="Email"
            name="email"
            placeholder="your@email.com"
            description=""
            required
          />
          <InputForm
            type="password"
            label="Password"
            name="password"
            description=""
            required
          />
          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600"
          >
            {buttonText}
          </Button>
        </form>
      </Form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <Separator />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>

      <div className="flex flex-row items-center justify-center space-x-4 pt-4">
        <form action={authWithGitHub}>
          <Button
            type="submit"
            variant="outline"
            className="w-full bg-white text-black dark:hover:bg-slate-300 dark:hover:text-black"
          >
            <Image
              src="/icons/github.svg"
              alt="GitHub"
              width={20}
              height={20}
              className="mr-2"
            />
            GitHub
          </Button>
        </form>
        <form action={authWithGoogle}>
          <Button
            type="submit"
            variant="outline"
            className="w-full bg-white text-black dark:hover:bg-slate-300 dark:hover:text-black"
          >
            <Image
              src="/icons/google.svg"
              alt="Google"
              width={20}
              height={20}
              className="mr-2"
            />
            Google
          </Button>
        </form>
      </div>
    </>
  );
}
