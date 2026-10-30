/** Amazon-style book browse categories — balanced 4-column directory. */
export type BookCategoryBlock = {
  heading: string;
  items: readonly string[];
};

/** Four even columns for equal layout. */
export const BOOK_CATEGORY_DIRECTORY: readonly (readonly BookCategoryBlock[])[] =
  [
    [
      {
        heading: "Top Categories",
        items: [
          "Romance",
          "Science Fiction & Fantasy",
          "Mystery, Thriller & Suspense",
          "History",
          "Children's Books",
        ],
      },
      {
        heading: "Fiction",
        items: [
          "Comics & Manga",
          "LGBTQIA+",
          "Literature & Fiction",
          "Mystery, Thriller & Suspense",
          "Romance",
        ],
      },
    ],
    [
      {
        heading: "Fiction (cont.)",
        items: [
          "Science Fiction & Fantasy",
          "Teen & Young Adult",
        ],
      },
      {
        heading: "Nonfiction",
        items: [
          "Arts & Photography",
          "Biographies & Memoirs",
          "Business & Money",
          "Computers & Technology",
          "Cookbooks, Food & Wine",
          "Crafts, Hobbies & Home",
          "Education & Teaching",
          "Engineering & Transportation",
        ],
      },
    ],
    [
      {
        heading: "Nonfiction (cont.)",
        items: [
          "Health, Fitness & Dieting",
          "History",
          "Humor & Entertainment",
          "Law",
          "LGBTQIA+",
          "Medical Books",
          "Parenting & Relationships",
          "Politics & Social Sciences",
          "Reference",
        ],
      },
    ],
    [
      {
        heading: "More Nonfiction",
        items: [
          "Religion & Spirituality",
          "Science & Math",
          "Sports & Outdoors",
          "Test Preparation",
          "Travel",
        ],
      },
      {
        heading: "Children's Books",
        items: [
          "All children's books",
          "Editors' Picks",
          "Teacher's Picks",
        ],
      },
    ],
  ] as const;

export function productTypeForCategory(
  category: string
):
  | "print_book"
  | "ebook"
  | "photo_book"
  | "comic_book"
  | "magazine"
  | "yearbook"
  | null {
  const c = category.toLowerCase();
  if (c.includes("comic") || c.includes("manga")) return "comic_book";
  if (c.includes("photo") || c.includes("arts & photography"))
    return "photo_book";
  if (c.includes("children")) return "print_book";
  return null;
}
