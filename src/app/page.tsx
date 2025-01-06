import { client } from "@/sanity/lib/client";
import { PortableText } from "@portabletext/react";
import Image from "next/image";
import Link from "next/link";
import urlBuilder from "@sanity/image-url"; // Image URL builder for Sanity
import Hero from "./components/Hero";
import Comment_ from "../app/components/Comment";

interface Blog {
  title: string;
  slug: { current: string };
  content: any;
  image: any;
  _id: string;
}

const builder = urlBuilder(client); // Initialize the Sanity image URL builder

async function getData(): Promise<Blog[]> {
  try {
    const res = await client.fetch(
      `*[_type == "blog"] {
        title,
        slug,
        content,
        image,
        _id
      }`
    );
    return res;
  } catch (error) {
    console.error("Error fetching blog data:", error);
    return [];
  }
}

export default async function Home() {
  const blogs = await getData();

  if (!blogs || blogs.length === 0) {
    return <div>No blogs available</div>;
  }

  return (
    <div className="p-6">
      {/* Blog List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogs.map((blog) => {
          const imageUrl = builder.image(blog.image).width(500).height(300).url();

          return (
            <div key={blog._id} className="bg-white shadow-lg rounded-lg overflow-hidden">
              {/* Image Section */}
              <div className="relative h-64">
                <Image
                  src={imageUrl}
                  alt={blog.title}
                  fill
                  className="object-cover rounded-t-lg"
                />
              </div>
              {/* Content Section */}
              <div className="p-4">
                <h2 className="text-xl font-bold text-gray-800 mb-2">{blog.title}</h2>
                <div className="text-gray-600 text-sm">
                  <PortableText value={blog.content} />
                </div>
                <div className="mt-4">
                  <Link href={`/blog/${blog.slug.current}`}>
                    <p className="text-blue-500 hover:text-blue-700 font-semibold">Read more</p>
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Hero Section */}
      <Hero />
      <Comment_ />
    </div>
  );
}
