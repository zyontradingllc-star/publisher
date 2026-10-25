import path from "path";
import type { CollectionConfig } from "payload";

/** Writable upload root — Docker creates /app/media owned by nextjs. */
const mediaDir = path.resolve(
  process.cwd(),
  process.env.MEDIA_DIR || "media"
);

export const Media: CollectionConfig = {
  slug: "media",
  access: {
    read: () => true,
    create: () => true,
    update: ({ req }) => Boolean(req.user),
    delete: ({ req }) => Boolean(req.user),
  },
  upload: {
    staticDir: mediaDir,
    mimeTypes: ["image/*"],
    // One small derivative only - full-size original is used for book covers.
    // Generating multiple sharp sizes on every upload made Content step slow.
    imageSizes: [
      {
        name: "thumbnail",
        width: 200,
        height: 300,
        position: "centre",
        withoutEnlargement: true,
      },
    ],
  },
  fields: [
    {
      name: "alt",
      type: "text",
    },
  ],
};
