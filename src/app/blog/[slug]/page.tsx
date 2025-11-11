import { getBlogPostCached } from "@/features/blog/actions";
import { notFound } from "next/navigation";
import React from "react";
import { renderBlocks } from "@/components/notion/render-blocks";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import type { Metadata, ResolvingMetadata } from "next";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const { slug } = await params;
  const content = await getBlogPostCached(slug);
  // optionally access and extend (rather than replace) parent metadata
  const parentMetadata = await parent;
  const previousImages = parentMetadata.openGraph?.images || [];

  if (!content)
    return {
      title: parentMetadata.title,
      description: parentMetadata.description,
    };
  return {
    title: content.post?.title,
    description: content.post?.title,
    openGraph: {
      images: content.post?.cover
        ? [
            {
              url: content.post?.cover,
            },
          ]
        : previousImages,
    },
  };
}

export const revalidate = 60 * 60 * 3;

export function generateStaticParams() {
  return [];
}

const BlogPostPage = async ({ params }: Props) => {
  const { slug } = await params;
  const content = await getBlogPostCached(slug);
  if (!content) return notFound();
  if (!content.success)
    return (
      <div>
        <h1 className="text-xl">Ooops!</h1>
        <p>Failed to fetch blog post, try refresh the page!</p>
      </div>
    );
  return (
    <>
      {/* Frontmater */}
      <div className="space-y-3">
        {content.post?.cover && (
          <Image
            src={content.post.cover}
            alt={content.post.slug}
            width={700}
            height={700}
            className="aspect-video w-full rounded-md object-cover"
          />
        )}
        <h1 className="text-primary text-2xl font-bold">
          {content.post?.title}
        </h1>
        <p className="text-secondary text-sm">
          By {content.post?.author} • {content.post?.publishedDate}
        </p>
      </div>

      <Separator className="my-5" />

      {/* Content */}
      <div className="space-y-4">
        {renderBlocks({ blocks: content.content })}
      </div>
    </>
  );
};

export default BlogPostPage;
