import z from "zod";

export const experienceSchema = z.object({
  index: z.number({ coerce: true }),
  company: z.string().min(1),
  title: z.string().min(1),
  description: z.string().optional(),
  period: z.string().min(1),
});

export type ExperienceSchematype = z.infer<typeof experienceSchema>;
