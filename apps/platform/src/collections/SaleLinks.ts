import type { CollectionConfig } from "payload";
import {
  firebaseUidFromReq,
  httpsOnlyUrl,
  isPayloadAdmin,
  saleLinkOwnerOrAdmin,
} from "@/lib/payload/access";

export const SaleLinks: CollectionConfig = {
  slug: "sale-links",
  labels: {
    singular: "Sale Link",
    plural: "Sale Links",
  },
  admin: {
    useAsTitle: "label",
    defaultColumns: ["label", "book", "targetUrl", "isActive", "updatedAt"],
    description: "External purchase / store links for a book (https only).",
  },
  access: {
    read: ({ req }) => {
      if (isPayloadAdmin(req)) return true;
      // Public may read active links (catalog); authors see own via Local API context.
      return { isActive: { equals: true } };
    },
    create: ({ req }) =>
      isPayloadAdmin(req) || Boolean(firebaseUidFromReq(req)),
    update: saleLinkOwnerOrAdmin,
    delete: saleLinkOwnerOrAdmin,
  },
  fields: [
    {
      name: "legacyId",
      type: "text",
      unique: true,
      index: true,
      admin: {
        description:
          "Stable import key (e.g. fs:books:{bookId}:sales_links:{linkId}).",
        position: "sidebar",
      },
    },
    {
      name: "book",
      type: "relationship",
      relationTo: "books",
      required: true,
      index: true,
    },
    {
      name: "label",
      type: "text",
      required: true,
    },
    {
      name: "targetUrl",
      type: "text",
      required: true,
      validate: httpsOnlyUrl,
      admin: {
        description: "Must be https:// only.",
      },
    },
    {
      name: "isActive",
      type: "checkbox",
      defaultValue: true,
      index: true,
    },
    {
      name: "linkType",
      type: "select",
      defaultValue: "other",
      options: [
        { label: "Author website", value: "author_website" },
        { label: "Amazon", value: "amazon" },
        { label: "Facebook", value: "facebook" },
        { label: "Instagram", value: "instagram" },
        { label: "WhatsApp", value: "whatsapp" },
        { label: "Other", value: "other" },
      ],
    },
    {
      name: "isPrimary",
      type: "checkbox",
      defaultValue: false,
    },
    {
      name: "displayOrder",
      type: "number",
      defaultValue: 0,
    },
  ],
};
