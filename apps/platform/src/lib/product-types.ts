export type ProductTypeId =
  | "print_book"
  | "photo_book"
  | "comic_book"
  | "magazine"
  | "yearbook"
  | "calendar"
  | "ebook";

export type ProductTypeOption = {
  id: ProductTypeId;
  title: string;
  description: string;
  /** Cropped showcase photo under /public/product-types/ */
  image?: string;
};

/** Listing categories on Publish → Book Details (replaces genre; drives later steps). */
export const PRODUCT_TYPES: readonly ProductTypeOption[] = [
  {
    id: "print_book",
    title: "Print Book",
    description:
      "Hardcover or paperback listing—wide range of paper, color, and binding styles. The most common format for novels, nonfiction, and most author projects.",
    image: "/product-types/print-book.webp",
  },
  {
    id: "ebook",
    title: "Ebook",
    description:
      "Digital edition for ereaders, tablets, and phones—PDF or EPUB ready to sell via Amazon, your site, or other retailers.",
    image: "/product-types/ebook.webp",
  },
  {
    id: "photo_book",
    title: "Photo Book",
    description:
      "Preserve memories or create a lookbook of your work with a hardcover photo book. Ideal for photography, art, and visual storytelling.",
    image: "/product-types/photo-book.webp",
  },
  {
    id: "comic_book",
    title: "Comic Book",
    description:
      "Traditional comic book size with paperback binding. Bring your art to life in black & white or rich color, including cover printing options.",
    image: "/product-types/comic-book.webp",
  },
  {
    id: "magazine",
    title: "Magazine",
    description:
      "Create beautiful magazines with rich color printing and paperback binding. Great for periodicals, zines, and issue-based publishing.",
    image: "/product-types/magazine.webp",
  },
  {
    id: "yearbook",
    title: "Yearbook",
    description:
      "For schools and institutions—flexible print-on-demand yearbooks with strong printing and binding options at a practical cost.",
    image: "/product-types/yearbook.webp",
  },
] as const;

export const DEFAULT_PRODUCT_TYPE: ProductTypeId = "ebook";

export function isProductTypeId(value: string): value is ProductTypeId {
  return PRODUCT_TYPES.some((t) => t.id === value) || value === "calendar";
}
