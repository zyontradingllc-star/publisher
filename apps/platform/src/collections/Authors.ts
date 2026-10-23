import type { CollectionConfig, Where } from "payload";
import {
  adminOnlyField,
  APPROVAL_STATUS_OPTIONS,
  authorSelfOrAdmin,
  firebaseUidFromReq,
  optionalHttpsUrl,
  isPayloadAdmin,
} from "@/lib/payload/access";

export const Authors: CollectionConfig = {
  slug: "authors",
  admin: {
    useAsTitle: "displayName",
    defaultColumns: [
      "displayName",
      "email",
      "approvalStatus",
      "slug",
      "updatedAt",
    ],
  },
  access: {
    read: ({ req }) => {
      if (isPayloadAdmin(req)) return true;
      const uid = firebaseUidFromReq(req);
      const approved: Where = {
        or: [
          { approvalStatus: { equals: "APPROVED" } },
          { approvalStatus: { exists: false } },
        ],
      };
      if (uid) {
        const own: Where = { firebaseUid: { equals: uid } };
        return { or: [approved, own] };
      }
      return approved;
    },
    create: ({ req }) =>
      isPayloadAdmin(req) || Boolean(firebaseUidFromReq(req)),
    update: authorSelfOrAdmin,
    delete: ({ req }) => isPayloadAdmin(req),
  },
  fields: [
    {
      name: "displayName",
      type: "text",
      required: true,
    },
    {
      name: "firstName",
      type: "text",
    },
    {
      name: "lastName",
      type: "text",
    },
    {
      name: "email",
      type: "email",
      required: true,
      unique: true,
      index: true,
    },
    {
      name: "firebaseUid",
      type: "text",
      unique: true,
      index: true,
      admin: {
        description:
          "Firebase Auth UID. Set server-side after ID token verify — never trust a client-sent uid alone.",
      },
    },
    {
      name: "legacyId",
      type: "text",
      unique: true,
      index: true,
      admin: {
        description:
          "Stable import key (e.g. fs:profiles:{uid}). Used by Firestore→Payload migration; do not edit.",
        position: "sidebar",
      },
    },
    {
      name: "slug",
      type: "text",
      required: true,
      unique: true,
      index: true,
    },
    {
      name: "bio",
      type: "textarea",
    },
    {
      name: "role",
      type: "select",
      defaultValue: "author",
      options: [
        { label: "Author", value: "author" },
        { label: "Admin", value: "admin" },
      ],
      index: true,
      admin: {
        position: "sidebar",
        description: "App role (separate from CMS /cms users).",
      },
    },
    {
      name: "websiteUrl",
      type: "text",
      validate: optionalHttpsUrl,
      admin: { description: "https only when set." },
    },
    {
      name: "hasAuthorWebsite",
      type: "checkbox",
      defaultValue: false,
    },
    {
      name: "socialFacebook",
      type: "text",
      validate: optionalHttpsUrl,
    },
    {
      name: "socialInstagram",
      type: "text",
      validate: optionalHttpsUrl,
    },
    {
      name: "socialTwitter",
      type: "text",
      validate: optionalHttpsUrl,
    },
    {
      name: "socialLinkedin",
      type: "text",
      validate: optionalHttpsUrl,
    },
    {
      name: "socialWhatsapp",
      type: "text",
    },
    {
      name: "socialTiktok",
      type: "text",
      validate: optionalHttpsUrl,
    },
    {
      name: "isPublic",
      type: "checkbox",
      defaultValue: false,
      index: true,
    },
    {
      name: "profileComplete",
      type: "checkbox",
      defaultValue: false,
    },
    {
      name: "avatarPath",
      type: "text",
      admin: {
        description:
          "Optional Firebase Storage path for avatar (used when not uploading via Media).",
      },
    },
    {
      name: "avatar",
      type: "upload",
      relationTo: "media",
      admin: {
        description: "Author profile picture shown on public author pages.",
      },
    },
    {
      name: "books",
      type: "relationship",
      relationTo: "books",
      hasMany: true,
      admin: {
        description:
          "Books associated with this author (also linked from Book → Author).",
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
        description: "Only CMS admins may change approval.",
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
  ],
};
