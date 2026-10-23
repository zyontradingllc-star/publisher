import type { CollectionConfig, Where } from "payload";
import {
  adminOnlyField,
  APPROVAL_STATUS_OPTIONS,
  bookOwnerOrAdmin,
  firebaseUidFromReq,
  isPayloadAdmin,
} from "@/lib/payload/access";

export const Books: CollectionConfig = {
  slug: "books",
  admin: {
    useAsTitle: "title",
    defaultColumns: [
      "title",
      "author",
      "status",
      "approvalStatus",
      "updatedAt",
    ],
  },
  access: {
    read: async ({ req }) => {
      if (isPayloadAdmin(req)) return true;
      // Treat missing approvalStatus as approved so pre-migration published books stay live.
      const publicClause: Where = {
        and: [
          { status: { equals: "published" } },
          {
            or: [
              { approvalStatus: { equals: "APPROVED" } },
              { approvalStatus: { exists: false } },
            ],
          },
        ],
      };
      const uid = firebaseUidFromReq(req);
      if (!uid) return publicClause;

      const authors = await req.payload.find({
        collection: "authors",
        where: { firebaseUid: { equals: uid } },
        limit: 1,
        depth: 0,
        overrideAccess: true,
      });
      const authorId = authors.docs[0]?.id;
      if (!authorId) return publicClause;
      const owned: Where = { author: { equals: authorId } };
      return { or: [publicClause, owned] };
    },
    create: ({ req }) =>
      isPayloadAdmin(req) || Boolean(firebaseUidFromReq(req)),
    update: bookOwnerOrAdmin,
    delete: ({ req }) => isPayloadAdmin(req),
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
      name: "legacyId",
      type: "text",
      unique: true,
      index: true,
      admin: {
        description:
          "Stable import key (e.g. fs:books:{id} or fs:drafts:{id}). Migration idempotency key.",
        position: "sidebar",
      },
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
      admin: {
        description: "Catalog visibility (draft / live / taken down).",
      },
    },
    {
      name: "approvalStatus",
      type: "select",
      required: true,
      defaultValue: "PENDING",
      index: true,
      options: [...APPROVAL_STATUS_OPTIONS],
      access: adminOnlyField,
      admin: {
        position: "sidebar",
        description: "Moderation. Only CMS admins may approve or reject.",
      },
    },
    {
      name: "rejectionReason",
      type: "textarea",
      access: adminOnlyField,
      admin: {
        position: "sidebar",
        condition: (_, siblingData) =>
          siblingData?.approvalStatus === "REJECTED",
      },
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
      name: "coverPath",
      type: "text",
      admin: {
        description:
          "Optional Firebase Storage path when cover is not a Media upload.",
      },
    },
    {
      name: "manuscriptPath",
      type: "text",
    },
    {
      name: "manuscriptFilename",
      type: "text",
    },
    {
      name: "manuscriptMime",
      type: "text",
    },
    {
      name: "manuscriptSizeBytes",
      type: "number",
    },
    {
      name: "rightsConfirmed",
      type: "checkbox",
      defaultValue: false,
    },
    {
      name: "contentPolicyAccepted",
      type: "checkbox",
      defaultValue: false,
    },
    {
      name: "submittedAt",
      type: "date",
      admin: {
        date: { pickerAppearance: "dayAndTime" },
      },
    },
    {
      name: "primarySalesChannel",
      type: "text",
      admin: {
        description:
          "Legacy single channel string. Prefer Sale Links collection.",
      },
    },
    {
      name: "saleLinks",
      type: "join",
      collection: "sale-links",
      on: "book",
      admin: {
        description: "Outbound store links for this book.",
      },
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
