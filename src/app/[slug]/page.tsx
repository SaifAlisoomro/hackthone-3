"use client"
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
  return res || null;
};

export default function BlogPage({ params }: { params: { slug: string } }) {
  const [blogData, setBlogData] = useState<Blog | null>(null);

  useEffect(() => {
    const getData = async () => {
      const data = await fetchBlogData(params.slug);
      setBlogData(data);
    };
    getData();
  }, [params.slug]);

  if (!blogData) {
    return <div>Loading...</div>;
  }

  // Correct URL generation for the image
  const imageUrl = urlBuilder(client).image(blogData.image).width(500).height(300).url();

  return (
    <div>
      <h1>{blogData.title}</h1>
      <div className="relative h-64">
        <Image
          src={imageUrl}
          alt={blogData.title}
          layout="fill"
          objectFit="cover"
          className="rounded-t-lg"
        />
      </div>
      <div>
        <PortableText value={blogData.content} />
      </div>
    </div>
  );
}
