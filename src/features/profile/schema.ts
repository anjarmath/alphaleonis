import z from "zod";

export const profileSchema = z.object({
  greeting: z.string().min(1),
  descTitle: z.string().min(1),
  descContent: z.string().min(1),
  email: z.string().email(),
  image: z.string().optional(),
  resume: z.string().optional(),
  mood: z.string().emoji(),
});

export type ProfileSchemaType = z.infer<typeof profileSchema>;
