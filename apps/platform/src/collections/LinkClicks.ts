import type { CollectionConfig } from "payload";
import { adminOnly } from "@/lib/payload/access";

export const LinkClicks: CollectionConfig = {
  slug: "link-clicks",
  labels: {
    singular: "Link Click",
    plural: "Link Clicks",
  },
  admin: {
    useAsTitle: "id",
    defaultColumns: ["saleLink", "source", "country", "clickedAt"],
    description:
      "Outbound click analytics only — not purchases or revenue.",
  },
  access: {
    // Anyone may record a click (server action should still validate the link).
    create: () => true,
    read: adminOnly,
    update: adminOnly,
    delete: adminOnly,
  },
  fields: [
    {
      name: "saleLink",
      type: "relationship",
      relationTo: "sale-links",
      required: true,
      index: true,
    },
    {
      name: "source",
      type: "text",
      admin: {
        description: "Referrer host or app surface (e.g. book page path).",
      },
    },
    {
      name: "country",
      type: "text",
      admin: {
        description: "Optional ISO country code from CDN / geo header.",
      },
    },
    {
      name: "clickedAt",
      type: "date",
      required: true,
      defaultValue: () => new Date().toISOString(),
      index: true,
      admin: {
        date: { pickerAppearance: "dayAndTime" },
      },
    },
  ],
  timestamps: false,
};
