import { z } from "zod";
type zodSchema = {
  name: string;
  email: string;
  password: string;
};

const userSchema = z.object({
  email: z.string().email({ message: "Invalid email" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" }),
});

export type { zodSchema };
export {  userSchema };
