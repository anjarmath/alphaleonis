import z from "zod";

export const portfolioSchema = z.object({
  greeting: z.string().min(1),
  descTitle: z.string().min(1),
  descContent: z.string().min(1),
  email: z.string().email(),
  image: z.string(),
  resume: z.string(),
  mood: z.string().emoji(),
});

export type Portfolio = z.infer<typeof portfolioSchema>;
