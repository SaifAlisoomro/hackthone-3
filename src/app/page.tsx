import Image from "next/image";
import { client } from "@/sanity/lib/client";
import Hero from "./components/Hero";
import { Image as Iimage } from "sanity";
import urlBuilder from "@sanity/image-url";
import { PortableText } from "@portabletext/react";
import Link from "next/link";

// Fetch blog data including all required fields
export const getData = async () => {
  try {
    const res = await client.fetch(
      `*[_type == 'blog'] {
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
};

interface idblog {
  title: string;
  slug: { current: string }; // slug should be an object with a "current" field
  content: any; // Using "any" because PortableText is an object type
  image: Iimage;
  _id: string; // Use _id as the unique identifier
}

const builder = urlBuilder(client); // Create the URL builder instance

export default async function Home() {
  const data: idblog[] = await getData();

  if (!data || data.length === 0) {
    return <div>No blogs available</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-6">
      {data.map((val) => {
        // Generate the image URL using the builder
        const imageUrl = builder.image(val.image).width(500).height(300).url();

        return (
          <div
            key={val._id}
            className="bg-white shadow-lg rounded-lg overflow-hidden transform transition-transform duration-300 ease-in-out hover:scale-105"
          >
            {/* Image and Title */}
            <div className="relative h-64">
              <Image
                src={imageUrl}
                alt={val.title}
                layout="fill"
                objectFit="cover"
                className="rounded-t-lg"
              />
            </div>
            <div className="p-4">
              <h2 className="text-xl font-bold text-gray-800 mb-2">{val.title}</h2>

              {/* Content */}
              <div className="text-gray-600 text-sm">
                <PortableText value={val.content} />
              </div>

              {/* "Read More" link */}
              <div className="mt-4">
                <Link href={`/blog${val.slug.current}`}>
                  <p className="text-blue-500 hover:text-blue-700 font-semibold">Read more</p>
                </Link>
              </div>
            </div>
          </div>
        );
      })}
      <Hero />
    </div>
  );
}
