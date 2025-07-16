import z from "zod";

export const portfolioSchema = z.object({
  brief: z.string().min(1),
});

export type PortfolioType = z.infer<typeof portfolioSchema>;
