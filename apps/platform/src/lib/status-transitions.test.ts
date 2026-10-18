import { describe, expect, it } from "vitest";
import {
  canTransition,
  isAuthorEditable,
  publishedCoreLocked,
} from "./status-transitions";

describe("canTransition", () => {
  it("allows author draft → pending_review", () => {
    expect(canTransition("draft", "pending_review")).toBe(true);
  });

  it("blocks author self-publish", () => {
    expect(canTransition("pending_review", "published", { asAdmin: false })).toBe(
      false
    );
  });

  it("allows admin publish from pending_review", () => {
    expect(
      canTransition("pending_review", "published", { asAdmin: true })
    ).toBe(true);
  });

  it("allows unpublish from published", () => {
    expect(canTransition("published", "unpublished", { asAdmin: true })).toBe(
      true
    );
  });

  it("rejects invented transitions", () => {
    expect(canTransition("draft", "published", { asAdmin: true })).toBe(false);
    expect(canTransition("rejected", "published", { asAdmin: true })).toBe(
      false
    );
  });
});

describe("author edit rules", () => {
  it("locks published core fields", () => {
    expect(publishedCoreLocked("published")).toBe(true);
    expect(isAuthorEditable("published")).toBe(false);
    expect(isAuthorEditable("draft")).toBe(true);
    expect(isAuthorEditable("changes_requested")).toBe(true);
  });
});
