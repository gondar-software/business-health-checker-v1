import { z } from 'zod';

export const customerSchema = z.object({
  name: z.string().min(1, "Client name is required"),
  sector: z.string().min(1, "Sector is required"),
  industry: z.string().min(1, "Industry is required"),
  size: z.string().min(1, "Size is required"),
  turnover: z.string().min(1, "Turnover is required"),
  logo_url: z.string().url().optional(),
});