import type { CollectionConfig, PayloadRequest } from "payload";
import { approveBookSubmission } from "@/lib/payload/approve-submission";

const isAdmin = ({ req }: { req: PayloadRequest }) => Boolean(req.user);

export const BookSubmissions: CollectionConfig = {
  slug: "book-submissions",
  labels: {
    singular: "Book Submission",
    plural: "Book Submissions",
  },
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "authorDisplay", "authorEmail", "status", "createdAt"],
    description: "Public book detail submissions awaiting review.",
  },
  access: {
    // Public may create only (via Local API / open create). Never list others.
    create: () => true,
    read: isAdmin,
    update: isAdmin,
    delete: isAdmin,
  },
  hooks: {
    beforeValidate: [
      ({ data, req, operation }) => {
        if (!data) return data;
        if (operation === "create" && !req.user) {
          data.status = "pending";
          data.adminNotes = undefined;
          data.reviewedBy = undefined;
          data.reviewedAt = undefined;
          data.approvedAuthor = undefined;
          data.approvedBook = undefined;
        }
        return data;
      },
    ],
    afterChange: [
      async ({ doc, previousDoc, req, operation, context }) => {
        if (context?.skipApproveHook) return doc;
        if (operation !== "update") return doc;
        if (doc.status !== "approved") return doc;
        if (previousDoc?.status === "approved") return doc;
        try {
          const result = await approveBookSubmission({
            payload: req.payload,
            submission: doc,
            reviewer: req.user,
          });
          if (result?.bookSlug) {
            return { ...doc, publicSlug: result.bookSlug };
          }
        } catch (err) {
          req.payload.logger.error(
            err instanceof Error ? err.message : "approveBookSubmission failed"
          );
        }
        return doc;
      },
    ],
  },
  fields: [
    {
      name: "redirectAfterApprove",
      type: "ui",
      admin: {
        position: "sidebar",
        components: {
          Field: "@/components/payload/RedirectAfterApprove#RedirectAfterApprove",
        },
      },
    },
    {
      name: "publicSlug",
      type: "text",
      admin: {
        position: "sidebar",
        readOnly: true,
        description: "Set on approve — public book URL slug.",
      },
      access: {
        update: () => false,
        create: () => false,
      },
    },
    {
      name: "language",
      type: "text",
      required: true,
    },
    {
      name: "title",
      type: "text",
      required: true,
      index: true,
    },
    {
      name: "subtitle",
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
      type: "group",
      fields: [
        { name: "firstName", type: "text", required: true },
        { name: "lastName", type: "text", required: true },
        { name: "email", type: "email", required: true, index: true },
      ],
    },
    // Admin list helpers (virtual-ish denormalized for columns)
    {
      name: "authorDisplay",
      type: "text",
      admin: {
        readOnly: true,
        position: "sidebar",
      },
      hooks: {
        beforeChange: [
          ({ siblingData }) => {
            const a = siblingData?.author;
            if (!a) return siblingData?.authorDisplay;
            return `${a.firstName || ""} ${a.lastName || ""}`.trim();
          },
        ],
      },
    },
    {
      name: "authorEmail",
      type: "email",
      admin: {
        readOnly: true,
        position: "sidebar",
      },
      hooks: {
        beforeChange: [
          ({ siblingData }) => siblingData?.author?.email || siblingData?.authorEmail,
        ],
      },
    },
    {
      name: "contributors",
      type: "array",
      fields: [
        {
          name: "role",
          type: "select",
          options: [
            { label: "Author", value: "author" },
            { label: "Editor", value: "editor" },
            { label: "Illustrator", value: "illustrator" },
            { label: "Translator", value: "translator" },
            { label: "Other", value: "other" },
          ],
        },
        { name: "firstName", type: "text" },
        { name: "lastName", type: "text" },
      ],
    },
    {
      name: "description",
      type: "textarea",
      required: true,
    },
    {
      name: "cover",
      type: "upload",
      relationTo: "media",
      admin: {
        description: "Cover uploaded in the Book Content step (or set here).",
      },
    },
    {
      name: "avatar",
      type: "upload",
      relationTo: "media",
      admin: {
        description:
          "Author profile picture from the Book Content step (copied to Author on approve).",
      },
    },
    {
      name: "publishingRights",
      type: "select",
      required: true,
      options: [
        { label: "Own copyright", value: "own_copyright" },
        { label: "Public domain", value: "public_domain" },
      ],
    },
    {
      name: "primaryAudience",
      type: "text",
      admin: {
        description: "From form “Primary audience” / explicit-content answer (yes|no).",
      },
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
      name: "genreId",
      type: "text",
    },
    {
      name: "keywords",
      type: "array",
      fields: [{ name: "value", type: "text" }],
    },
    {
      name: "status",
      type: "select",
      required: true,
      defaultValue: "pending",
      index: true,
      options: [
        { label: "Pending", value: "pending" },
        { label: "Under Review", value: "under_review" },
        { label: "Request Changes", value: "changes_requested" },
        { label: "Approved", value: "approved" },
        { label: "Rejected", value: "rejected" },
      ],
      access: {
        update: isAdmin,
      },
      admin: {
        position: "sidebar",
        description:
          "Mark Under Review / Request Changes / Approve / Reject. Approving creates Author + Book.",
      },
    },
    {
      name: "adminNotes",
      type: "textarea",
      access: {
        read: isAdmin,
        update: isAdmin,
        create: () => false,
      },
      admin: {
        position: "sidebar",
      },
    },
    {
      name: "reviewedBy",
      type: "relationship",
      relationTo: "users",
      access: {
        read: isAdmin,
        update: isAdmin,
        create: () => false,
      },
      admin: { position: "sidebar", readOnly: true },
    },
    {
      name: "reviewedAt",
      type: "date",
      access: {
        read: isAdmin,
        update: isAdmin,
        create: () => false,
      },
      admin: {
        position: "sidebar",
        readOnly: true,
        date: { pickerAppearance: "dayAndTime" },
      },
    },
    {
      name: "approvedAuthor",
      type: "relationship",
      relationTo: "authors",
      access: { read: isAdmin, update: () => false, create: () => false },
      admin: { position: "sidebar", readOnly: true },
    },
    {
      name: "approvedBook",
      type: "relationship",
      relationTo: "books",
      access: { read: isAdmin, update: () => false, create: () => false },
      admin: { position: "sidebar", readOnly: true },
    },
  ],
};
