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

export const customerSchema = z.object({
  name: z.string().min(1, "Client name is required"),
  sector: z.string().min(1, "Sector is required"),
  industry: z.string().min(1, "Industry is required"),
  size: z.string().min(1, "Size is required"),
  turnover: z.string().min(1, "Turnover is required"),
  logo_url: z.string().url().optional(),
});

export const assessorSchema = z.object({
  name: z.string().min(1, "Assessor name is required"),
  role: z.string().min(1, "Assessor role is required"),
});