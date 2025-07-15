import z from "zod";

export const addCertificateSchema = z.object({
  title: z.string().min(1),
  issuer: z.string().min(1),
  image: z.string().min(1),
  validation: z.string().optional(),
  period: z.string().min(1),
});

export const editCertificateSchema = z.object({
  title: z.string().optional(),
  issuer: z.string().optional(),
  image: z.string().optional(),
  validation: z.string().optional(),
  period: z.string().optional(),
});

export type AddCertificateSchemaType = z.infer<typeof addCertificateSchema>;
export type EditCertificateSchemaType = z.infer<typeof editCertificateSchema>;
