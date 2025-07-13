import { z } from "zod";

export const signUpSchema = z.object({
  email: z.string().email(),
  pwd: z.string().min(6),
  "con-pwd": z.string().min(6)
}).refine(data => data.pwd === data["con-pwd"], {
  message: "Passwords don't match",
  path: ["con-pwd"]
});

export const loginSchema = z.object({
  email: z.string().email(),
  pwd: z.string().min(6),
});

export const rePwdSchema1 = z.object({
  email: z.string().email()
});

export const rePwdSchema2 = z.object({
  pwd: z.string().min(6),
  "con-pwd": z.string().min(6)
}).refine(data => data.pwd === data["con-pwd"], {
  message: "Passwords don't match",
  path: ["con-pwd"]
});