import sharp from "sharp";

/**
 * Convert an uploaded image File to WebP for storage.
 * Resizes oversized images while keeping aspect ratio.
 */
export async function fileToWebp(
  file: File,
  opts: { maxWidth: number; maxHeight: number; quality?: number; basename: string }
): Promise<File> {
  const input = Buffer.from(await file.arrayBuffer());
  const quality = opts.quality ?? 82;

  const webpBuffer = await sharp(input)
    .rotate()
    .resize({
      width: opts.maxWidth,
      height: opts.maxHeight,
      fit: "inside",
      withoutEnlargement: true,
    })
    .webp({ quality })
    .toBuffer();

  const safeBase =
    opts.basename.replace(/[^a-zA-Z0-9._-]/g, "_").replace(/\.[^.]+$/, "") ||
    "image";

  return new File([new Uint8Array(webpBuffer)], `${safeBase}.webp`, {
    type: "image/webp",
    lastModified: Date.now(),
  });
}
