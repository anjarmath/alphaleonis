import {
  addCertificateSchema,
  editCertificateSchema,
} from "@/features/certificate/schema";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";
import { Bucket, MAX_FILE_SIZE_IMAGE } from "@/lib/supabase/bucket";
import { supabaseAdminClient } from "@/lib/supabase/server";
import z from "zod";

export const certificateRouter = createTRPCRouter({
  get: publicProcedure.query(async ({ ctx }) => {
    return ctx.db.certificate.findMany();
  }),

  add: protectedProcedure
    .input(addCertificateSchema)
    .mutation(async ({ ctx, input }) => {
      const tmp = new Date().getTime().toString();

      //    Upload input.image to supabase storage
      let imageUrl: string = "#";
      const fileName = `certification-${input.title}.jpeg`;
      const buffer = Buffer.from(input.image, "base64");

      if (buffer.byteLength > MAX_FILE_SIZE_IMAGE) {
        throw new Error("Ukuran gambar tidak boleh lebih dari 5MB");
      }

      const { data, error } = await supabaseAdminClient.storage
        .from(Bucket.CERTIFICATE)
        .upload(fileName, buffer, {
          contentType: "image/jpeg",
          cacheControl: "3600",
          upsert: true,
        });
      if (error) throw new Error(error.message);
      imageUrl = supabaseAdminClient.storage
        .from(Bucket.CERTIFICATE)
        .getPublicUrl(data.path).data.publicUrl;

      return ctx.db.certificate.create({
        data: {
          ...input,
          image: `${imageUrl}?t=${tmp}`,
        },
      });
    }),

  edit: protectedProcedure
    .input(
      z.object({
        id: z.number(),
        data: editCertificateSchema,
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const tmp = new Date().getTime().toString();
      //    Upload input.image if exists to supabase storage
      let imageUrl: string | undefined = undefined;
      if (input.data.image) {
        const fileName = `certification-${input.data.title}.jpeg`;
        const buffer = Buffer.from(input.data.image, "base64");

        if (buffer.byteLength > MAX_FILE_SIZE_IMAGE) {
          throw new Error("Ukuran gambar tidak boleh lebih dari 5MB");
        }

        const { data, error } = await supabaseAdminClient.storage
          .from(Bucket.CERTIFICATE)
          .upload(fileName, buffer, {
            contentType: "image/jpeg",
            cacheControl: "3600",
            upsert: true,
          });
        if (error) throw new Error(error.message);
        imageUrl = supabaseAdminClient.storage
          .from(Bucket.CERTIFICATE)
          .getPublicUrl(data.path).data.publicUrl;
      }

      return ctx.db.certificate.update({
        where: { id: input.id },
        data: {
          ...input.data,
          image: imageUrl ? `${imageUrl}?t=${tmp}` : undefined,
        },
      });
    }),

  delete: protectedProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.certificate.delete({ where: { id: input.id } });
    }),
});
