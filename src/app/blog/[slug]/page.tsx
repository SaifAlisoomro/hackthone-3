"use client";
import { client } from "@/sanity/lib/client";
import { Image as Iimage } from "sanity";
import { PortableText } from "@portabletext/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import urlBuilder from "@sanity/image-url";  // Correct import

interface Blog {
  title: string;
  slug: { current: string };
  content: any;
  image: Iimage;
  _id: string;
}

const fetchBlogData = async (slug: string): Promise<Blog | null> => {
  const res = await client.fetch(
    `*[_type == "blog" && slug.current == $slug][0] {
      title,
      slug,
      content,
      image,
      _id
    }`,
    { slug }
  );
  console.log(res);
  
  return res || null;
};

export default function BlogPage({ params }: { params: { slug: string } }) {
  const [blogData, setBlogData] = useState<Blog | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const getData = async () => {
      const data = await fetchBlogData(params.slug);
      setBlogData(data);
      setLoading(false);
    };
    getData();
  }, [params.slug]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="border-t-4 border-blue-500 border-solid w-16 h-16 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!blogData) {
    return <div className="text-center text-xl font-semibold">Blog not found</div>;
  }

  // Correct URL generation for the image
  const imageUrl = urlBuilder(client).image(blogData.image).width(1200).height(800).url();

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-8">
      {/* Image Section */}
      <div className="relative h-96 mb-6">
        <Image
          src={imageUrl}
          alt={blogData.title}
          layout="fill"
          objectFit="cover"
          className="rounded-lg"
        />
      </div>

      {/* Title */}
      <h1 className="text-4xl font-extrabold text-gray-800 mb-4">{blogData.title}</h1>

      {/* Full Content Section */}
      <div className="text-lg text-gray-700 leading-relaxed">
        <PortableText value={blogData.content} />
      </div>
    </div>
  );
}
