import { getBlogPost } from "@/features/blog/actions";
import { notFound } from "next/navigation";
import React from "react";
import { renderBlocks } from "@/components/notion/render-blocks";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";

const BlogPostPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;
  const content = await getBlogPost(slug);
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
