"use client";
import { signInWithEmail, signUpWithEmail } from "@/app/actions";
import { formSchema, type formValueType } from "@/utils/schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { InputForm } from "@/components/ui/input-form";
import { Button } from "@/components/ui/button";

const defaultValues: formValueType = {
  email: "",
  password: "",
};

type AuthFormProps = {
  formType: "login" | "register";
};

export default function EmailAuth({ formType }: AuthFormProps) {
  const form = useForm<formValueType>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const handleSubmit = formType === "login" ? signInWithEmail : signUpWithEmail;
  const buttonText = formType === "login" ? "Login" : "Register";

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="w-full flex flex-col gap-y-4"
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
        <Button>{buttonText}</Button>
      </form>
    </Form>
  );
}
