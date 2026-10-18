import { describe, expect, it } from "vitest";
import {
  isSafeHttpUrl,
  purchaseCtaLabel,
  slugify,
  truncate,
} from "./utils";

describe("slugify", () => {
  it("creates lowercase hyphenated slugs", () => {
    expect(slugify("  My Great Book! ")).toBe("my-great-book");
  });

  it("strips apostrophes", () => {
    expect(slugify("Author's Tale")).toBe("authors-tale");
  });
});

describe("isSafeHttpUrl", () => {
  it("accepts http and https", () => {
    expect(isSafeHttpUrl("https://example.com/book")).toBe(true);
    expect(isSafeHttpUrl("http://store.example.com")).toBe(true);
  });

  it("rejects javascript and invalid urls", () => {
    expect(isSafeHttpUrl("javascript:alert(1)")).toBe(false);
    expect(isSafeHttpUrl("not-a-url")).toBe(false);
  });
});

describe("purchaseCtaLabel", () => {
  it("labels author website and amazon destinations", () => {
    expect(purchaseCtaLabel("author_website")).toBe("Buy on Author's Website");
    expect(purchaseCtaLabel("amazon")).toBe("View on Amazon");
    expect(purchaseCtaLabel("other")).toBe("View Purchase Options");
  });
});

describe("truncate", () => {
  it("leaves short text unchanged", () => {
    expect(truncate("hello", 10)).toBe("hello");
  });

  it("truncates long text with ellipsis", () => {
    expect(truncate("abcdefghijklmnop", 10)).toBe("abcdefghi…");
  });
});
