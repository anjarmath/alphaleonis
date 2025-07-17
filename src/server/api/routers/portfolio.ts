import z from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";
import { portfolioSchema } from "@/features/portfolio/schema";
import { Bucket, MAX_FILE_SIZE_IMAGE } from "@/lib/supabase/bucket";
import { supabaseAdminClient } from "@/lib/supabase/server";

export const portfolioRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.db.portfolio.findMany();
  }),

  get: publicProcedure
    .input(
      z.object({
        id: z.number(),
      }),
    )
    .query(({ ctx, input }) => {
      return ctx.db.portfolio.findUnique({
        where: {
          id: input.id,
        },
      });
    }),

  add: protectedProcedure
    .input(portfolioSchema)
    .mutation(async ({ ctx, input }) => {
      const tmp = new Date().getTime().toString();
      // If there is input.image, upload to supabase storage
      let imageUrl: string | undefined = undefined;
      if (input.image) {
        const fileName = `portfolio-${input.title}.jpeg`;
        const buffer = Buffer.from(input.image, "base64");

        if (buffer.byteLength > MAX_FILE_SIZE_IMAGE) {
          throw new Error("Ukuran gambar tidak boleh lebih dari 5MB");
        }

        const { data, error } = await supabaseAdminClient.storage
          .from(Bucket.PORTFOLIO)
          .upload(fileName, buffer, {
            contentType: "image/jpeg",
            cacheControl: "3600",
            upsert: true,
          });
        if (error) throw new Error(error.message);
        imageUrl = supabaseAdminClient.storage
          .from(Bucket.PORTFOLIO)
          .getPublicUrl(data.path).data.publicUrl;
      }
      return ctx.db.portfolio.create({
        data: {
          ...input,
          image: imageUrl ? `${imageUrl}?t=${tmp}` : undefined,
        },
      });
    }),

  edit: protectedProcedure
    .input(
      z.object({
        id: z.number(),
        data: portfolioSchema,
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const tmp = new Date().getTime().toString();
      // If there is input.image, upload to supabase storage
      let imageUrl: string | undefined = undefined;
      if (input.data.image) {
        const fileName = `portfolio-${input.data.title}.jpeg`;
        const buffer = Buffer.from(input.data.image, "base64");

        if (buffer.byteLength > MAX_FILE_SIZE_IMAGE) {
          throw new Error("Ukuran gambar tidak boleh lebih dari 5MB");
        }

        const { data, error } = await supabaseAdminClient.storage
          .from(Bucket.PORTFOLIO)
          .upload(fileName, buffer, {
            contentType: "image/jpeg",
            cacheControl: "3600",
            upsert: true,
          });
        if (error) throw new Error(error.message);
        imageUrl = supabaseAdminClient.storage
          .from(Bucket.PORTFOLIO)
          .getPublicUrl(data.path).data.publicUrl;
      }
      return ctx.db.portfolio.update({
        where: { id: input.id },
        data: {
          ...input.data,
          image: imageUrl ? `${imageUrl}?t=${tmp}` : undefined,
        },
      });
    }),

  toggleVisibility: protectedProcedure
    .input(
      z.object({
        id: z.number(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const portfolio = await ctx.db.portfolio.findUnique({
        where: {
          id: input.id,
        },
      });

      if (!portfolio) return;

      return ctx.db.portfolio.update({
        where: { id: input.id },
        data: {
          visible: !portfolio.visible,
        },
      });
    }),

  delete: protectedProcedure
    .input(
      z.object({
        id: z.number(),
      }),
    )
    .mutation(({ ctx, input }) => {
      return ctx.db.portfolio.delete({
        where: {
          id: input.id,
        },
      });
    }),
});
