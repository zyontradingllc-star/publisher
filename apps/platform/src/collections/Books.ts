import type { CollectionConfig } from "payload";

export const Books: CollectionConfig = {
  slug: "books",
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "author", "status", "updatedAt"],
  },
  access: {
    read: ({ req }) => {
      if (req.user) return true;
      return { status: { equals: "published" } };
    },
    create: ({ req }) => Boolean(req.user),
    update: ({ req }) => Boolean(req.user),
    delete: ({ req }) => Boolean(req.user),
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
    },
    {
      name: "slug",
      type: "text",
      required: true,
      unique: true,
      index: true,
    },
    {
      name: "subtitle",
      type: "text",
    },
    {
      name: "description",
      type: "textarea",
    },
    {
      name: "cover",
      type: "upload",
      relationTo: "media",
      admin: {
        description: "Book cover image shown on catalog and book page.",
      },
    },
    {
      name: "language",
      type: "text",
    },
    {
      name: "seriesName",
      type: "text",
    },
    {
      name: "editionNumber",
      type: "text",
    },
    {
      name: "author",
      type: "relationship",
      relationTo: "authors",
      required: true,
      index: true,
    },
    {
      name: "status",
      type: "select",
      required: true,
      defaultValue: "draft",
      options: [
        { label: "Draft", value: "draft" },
        { label: "Published", value: "published" },
        { label: "Unpublished", value: "unpublished" },
      ],
      index: true,
    },
    {
      name: "publishingRights",
      type: "text",
    },
    {
      name: "primaryAudience",
      type: "text",
    },
    {
      name: "readingAgeMin",
      type: "number",
    },
    {
      name: "readingAgeMax",
      type: "number",
    },
    {
      name: "primarySalesChannel",
      type: "text",
    },
    {
      name: "submission",
      type: "relationship",
      relationTo: "book-submissions",
      admin: {
        description: "Original Book Submissions audit record.",
      },
    },
    {
      name: "publishedAt",
      type: "date",
      admin: {
        date: { pickerAppearance: "dayAndTime" },
      },
    },
  ],
};
