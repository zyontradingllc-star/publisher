import { getBookBySlug } from "../src/lib/books";
import { getAuthorBySlug } from "../src/lib/books";

async function main() {
  const book = await getBookBySlug("my-book-7236a1");
  console.log("book profiles", {
    title: book.book?.title,
    avatar: book.book?.profiles?.avatar_path,
    banner: book.book?.profiles?.banner_path,
    slug: book.book?.profiles?.slug,
  });
  const author = await getAuthorBySlug("nik-Exh3Tz");
  console.log("author page", {
    name: author.author?.display_name,
    avatar: author.author?.avatar_path,
    banner: author.author?.banner_path,
  });
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
