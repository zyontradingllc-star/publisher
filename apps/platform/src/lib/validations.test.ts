import { describe, expect, it } from "vitest";
import {
  bookSubmitSchema,
  loginSchema,
  profileSchema,
  salesLinkSchema,
  signupSchema,
} from "./validations";

describe("signupSchema", () => {
  it("requires matching passwords", () => {
    const result = signupSchema.safeParse({
      email: "a@example.com",
      password: "password1",
      confirmPassword: "password2",
      displayName: "Ada",
    });
    expect(result.success).toBe(false);
  });

  it("accepts valid signup", () => {
    const result = signupSchema.safeParse({
      email: "a@example.com",
      password: "password1",
      confirmPassword: "password1",
      displayName: "Ada Lovelace",
    });
    expect(result.success).toBe(true);
  });
});

describe("loginSchema", () => {
  it("rejects empty password", () => {
    expect(
      loginSchema.safeParse({ email: "a@example.com", password: "" }).success
    ).toBe(false);
  });
});

describe("salesLinkSchema", () => {
  it("requires http(s) urls", () => {
    expect(
      salesLinkSchema.safeParse({
        link_type: "amazon",
        label: "Amazon",
        url: "ftp://bad.example",
        is_active: true,
        is_primary: false,
        display_order: 0,
      }).success
    ).toBe(false);

    expect(
      salesLinkSchema.safeParse({
        link_type: "author_website",
        label: "My Store",
        url: "https://author.example/buy",
        is_active: true,
        is_primary: true,
        display_order: 0,
      }).success
    ).toBe(true);
  });
});

describe("bookSubmitSchema", () => {
  it("requires cover, genre, rights, and policy", () => {
    const result = bookSubmitSchema.safeParse({
      title: "Test Book",
      subtitle: "",
      slug: "test-book",
      description: "Short",
      author_display_name: "Author",
      genre_id: "",
      language: "en",
      publication_date: "",
      rights_confirmed: false,
      content_policy_accepted: false,
      cover_path: "",
    });
    expect(result.success).toBe(false);
  });
});

describe("profileSchema", () => {
  it("validates slug format", () => {
    expect(
      profileSchema.safeParse({
        display_name: "Ada",
        slug: "Ada Lovelace",
        bio: "",
        has_author_website: false,
        is_public: true,
      }).success
    ).toBe(false);
  });
});
