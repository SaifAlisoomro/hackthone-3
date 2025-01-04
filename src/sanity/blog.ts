import { defineType, defineField } from 'sanity';

export default defineType({
    name: "blog",
    type: "document",
    title: "Blog",
    fields: [
        defineField({
            name: "title",
            type: "string",
            title: "Title",
        }),
       
        defineField({
            name: "slug",
            type: "slug",
            title: "Slug",
            options: {
                source: "title", // Automatically generate slug from the title
                maxLength: 96,   // Optional: Limit the slug length
            },
        }),
        defineField({
            name: "image",
            type: "image",
            title: "Image",
            options: {
                hotspot: true,
            },
        }),
        defineField({
            name: "content",
            type: "array",
            title: "Content",
            of: [
                { type: "block" }, // Basic rich text elements (headings, paragraphs, bold, italic, etc.)
            ],
        }),
    ],
});
