import React from "react";
import Image from "next/image";

interface HeroSectionProps {
  post: any;
}

const HeroSection: React.FC<HeroSectionProps> = ({ post }) => {
  return (
    <div className="flex items-center flex-col lg:gap-8 gap-4 lg:px-16 px-4 lg:py-20 py-10 mx-auto mt-12">
      <div className="w-full text-center">
        <h1 className="lg:text-5xl text-3xl font-semibold mb-4">
          {post.title}
        </h1>
        <p className="text-base font-semibold text-gray-500 mb-4">
          {post.author} on <span>{post.date}</span>
        </p>
      </div>

      <div className="w-full h-60 lg:h-[590px] md:mt-0">
        {post.image && (
          <Image
            src={post.image}
            width={1000}
            height={500}
            alt={post.title}
            className="w-full h-full object-cover rounded-3xl shadow-md"
          />
        )}
      </div>
    </div>
  );
};

export default HeroSection;
