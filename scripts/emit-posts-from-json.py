"""Regenerate posts-generated.ts from generated-50.json (keeps current image paths)."""
from __future__ import annotations

import json
from pathlib import Path

ROOT = Path(r"c:\Users\PC\Desktop\projects\next-js\book")
src = ROOT / "apps/platform/src/lib/blog/generated-50.json"
out_ts = ROOT / "apps/platform/src/lib/blog/posts-generated.ts"

blogs = json.loads(src.read_text(encoding="utf-8"))
cats = sorted({b["category"] for b in blogs})


def esc(s: str) -> str:
    return json.dumps(s, ensure_ascii=False)


lines: list[str] = []
lines.append("/** Auto-generated from 50-BLOGS xlsx + docx. Do not edit by hand. */")
lines.append("")
lines.append("export const GENERATED_BLOG_CATEGORIES = [")
for c in cats:
    lines.append(f"  {esc(c)},")
lines.append("] as const;")
lines.append("")
lines.append("export const GENERATED_BLOG_POSTS = [")
for b in blogs:
    lines.append("  {")
    lines.append(f"    slug: {esc(b['slug'])},")
    lines.append(f"    title: {esc(b['title'])},")
    lines.append(f"    h1: {esc(b['h1'])},")
    lines.append(f"    metaDescription: {esc(b['metaDescription'])},")
    h0, h1, h2 = b["headings"][0], b["headings"][1], b["headings"][2]
    lines.append(f"    headings: [{esc(h0)}, {esc(h1)}, {esc(h2)}] as const,")
    lines.append(f"    excerpt: {esc(b['excerpt'])},")
    lines.append(f"    category: {esc(b['category'])},")
    lines.append(f"    author: {esc(b['author'])},")
    lines.append(f"    authorInitials: {esc(b['authorInitials'])},")
    lines.append(f"    publishedAt: {esc(b['publishedAt'])},")
    lines.append(f"    readTimeMinutes: {b['readTimeMinutes']},")
    lines.append(f"    image: {esc(b['image'])},")
    lines.append(f"    imageAlt: {esc(b['imageAlt'])},")
    if b.get("trending"):
        lines.append("    trending: true,")
    lines.append("    body: [")
    full_body = list(b["body"]) + list(b.get("bodyExtra") or [])
    for p in full_body[:6]:
        lines.append(f"      {esc(p)},")
    lines.append("    ],")
    lines.append(f"    interlinks: {json.dumps(b['interlinks'], ensure_ascii=False)},")
    lines.append(f"    aeoAnswer: {esc(b['aeoAnswer'])},")
    lines.append("  },")
lines.append("];")
lines.append("")

out_ts.write_text("\n".join(lines), encoding="utf-8")
print(f"Wrote {len(blogs)} posts -> {out_ts}")
print("blog images:", sum(1 for b in blogs if str(b["image"]).startswith("/blog/")))
