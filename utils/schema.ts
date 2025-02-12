import { z } from "zod";

export const formSchema = z.object({
  email: z.string().email({
    message: "Email must be a valid email address.",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
});

export type formValueType = z.infer<typeof formSchema>;
