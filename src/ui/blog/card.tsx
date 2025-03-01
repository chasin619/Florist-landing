import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Flex } from "@radix-ui/themes";

interface BlogCardProps {
  title: string;
  slug: string;
  content: string;
  author: string;
  createdAt?: string;
  image: string;
}

const BlogCard: React.FC<BlogCardProps> = ({
  title,
  slug,
  content,
  author,
  createdAt,
  image,
}) => {
  const formatDate = (date: string | Date): string => {
    const options: Intl.DateTimeFormatOptions = {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    };
    return new Date(date).toLocaleDateString("en-US", options);
  };
  return (
    <Link href={`/blog/${slug}`}>
      <Flex
        display={{ initial: "none", md: "flex" }}
        direction="column"
        align="center"
        px="4"
        py="4"
        className="w-full rounded-lg shadow-lg transition-all hover:shadow-xl focus:outline-none cursor-pointer"
      >
        <div className="relative mb-4">
          <div className="h-60 w-full flex items-center justify-center rounded-md bg-white overflow-hidden">
            <Image
              src={image}
              width={600}
              height={600}
              alt={slug}
              className="h-full object-cover"
            />
          </div>
        </div>
        <div>
          <h2 className="md:text-2xl text-xl font-bold text-primaryGray mb-2">
            {title}
          </h2>
          <span
            className="text-primaryGray text-sm md:text-base mb-4"
            dangerouslySetInnerHTML={{
              __html: content.substring(0, 100) + "...",
            }}
          />
          <div className="text-primaryGray text-sm flex justify-between items-center mt-12">
            <p className="mb-1">{author}</p>
            <p>{formatDate(createdAt || "")}</p>
          </div>
        </div>
      </Flex>
    </Link>
  );
};

export default BlogCard;
