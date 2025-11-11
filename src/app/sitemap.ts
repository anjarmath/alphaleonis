import { getAllPostCached } from "@/features/blog/actions";
import type { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const allPost = await getAllPostCached(false, undefined);

  const generatedUrls: MetadataRoute.Sitemap = allPost.blogs
    ? allPost.blogs.map((post) => ({
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/blog/${post.slug}`,
      }))
    : [];
  return [
    {
      url: `${process.env.NEXT_PUBLIC_BASE_URL}`,
    },
    {
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/blog`,
    },
    ...generatedUrls,
  ];
}
