"""Export 50 blogs from xlsx + docx into JSON for the platform blog."""
from __future__ import annotations

import json
import re
from pathlib import Path

import openpyxl
from docx import Document

desktop = Path(r"c:\Users\PC\Desktop")
xlsx = next(desktop.rglob("50-BLOGS-With-Strong-Interlinks*.xlsx"))
docx_path = next(desktop.rglob("50-BLOGS-FULL-CONTENT-Ready*.docx"))
out = Path(r"c:\Users\PC\Desktop\projects\next-js\book\apps\platform\src\lib\blog\generated-50.json")

wb = openpyxl.load_workbook(xlsx, data_only=True)
ws = wb["50 Blogs - Ready to Publish"]
headers = [ws.cell(1, c).value for c in range(1, ws.max_column + 1)]
print("HEADERS:", headers)

inter = wb["Interlink Map - Strong (5 Links Each)"]
inter_map: dict[str, list[str]] = {}
for r in range(2, inter.max_row + 1):
    slug = inter.cell(r, 2).value
    if not slug:
        continue
    links = []
    for c in range(3, 8):
        v = inter.cell(r, c).value
        if v:
            links.append(str(v).strip())
    inter_map[str(slug).strip().rstrip("/") + "/"] = links

blogs = []
for r in range(2, ws.max_row + 1):
    row = {headers[c - 1]: ws.cell(r, c).value for c in range(1, ws.max_column + 1)}
    if not row.get("Blog Title"):
        continue
    slug_raw = str(row.get("Slug (/blog/...)") or "").strip()
    slug = slug_raw.replace("/blog/", "").strip("/")
    h2_raw = str(row.get("H2 Structure (AEO)") or "")
    headings = []
    for part in re.split(r"\s*\|\s*", h2_raw):
        part = part.strip()
        m = re.match(r"H2:\s*(.+?)(?:\s*\(|$)", part)
        if m:
            headings.append(m.group(1).strip())
        elif part:
            headings.append(re.sub(r"^H2:\s*", "", part).strip())
    headings = [h for h in headings if h][:3]
    while len(headings) < 3:
        headings.append(f"Key tip {len(headings) + 1}")

    slug_key = f"/blog/{slug}/"
    blogs.append(
        {
            "no": row.get("No"),
            "slug": slug,
            "title": str(row.get("Blog Title") or "").strip(),
            "h1": str(row.get("H1") or row.get("Blog Title") or "").strip(),
            "primaryKeyword": str(row.get("Primary Keyword") or "").strip(),
            "secondaryKeywords": [
                k.strip()
                for k in str(row.get("Secondary Keywords") or "").split(",")
                if k.strip()
            ],
            "metaDescription": str(row.get("Meta Description (155)") or "").strip()[:160],
            "seoTitle": str(row.get("SEO Title (60)") or "").strip(),
            "aeoAnswer": str(row.get("AEO Direct Answer (45 words)") or "").strip(),
            "headings": headings,
            "interlinks": inter_map.get(slug_key, inter_map.get(slug_raw, [])),
            "body": [],
        }
    )

print(f"Excel blogs: {len(blogs)}")

# Parse DOCX — expect headings matching titles / numbered posts
doc = Document(str(docx_path))
paras = []
for p in doc.paragraphs:
    t = (p.text or "").strip()
    if t:
        paras.append((p.style.name if p.style else "Normal", t))

print(f"DOCX paragraphs: {len(paras)}")
# dump first 40 for inspection
for i, (st, t) in enumerate(paras[:40]):
    print(f"{i:03d} [{st}] {t[:100]}")

# Heuristic: split by Blog Title matches or "Blog 1" patterns
by_title = {b["title"].lower(): b for b in blogs}
by_h1 = {b["h1"].lower(): b for b in blogs}
current = None
for st, t in paras:
    low = t.lower()
    matched = by_title.get(low) or by_h1.get(low)
    if matched:
        current = matched
        continue
    # Blog N: Title
    m = re.match(r"(?:blog\s*)?#?\s*(\d+)\s*[:.\-–—]\s*(.+)$", t, re.I)
    if m:
        n = int(m.group(1))
        for b in blogs:
            if int(b["no"] or 0) == n:
                current = b
                break
        continue
    if current is None:
        continue
    if st.startswith("Heading"):
        # skip if it's the title again
        if low in (current["title"].lower(), current["h1"].lower()):
            continue
    current["body"].append(t)

filled = sum(1 for b in blogs if b["body"])
print(f"Blogs with body from docx: {filled}")
empty = [b["slug"] for b in blogs if not b["body"]]
print("Empty body slugs:", empty[:10], "..." if len(empty) > 10 else "")

# Fallback body from AEO + headings
for b in blogs:
    if not b["body"]:
        b["body"] = [
            b["aeoAnswer"]
            or f"{b['h1']} on Authors Pilot: free author page, one shareable link, and 100% royalties.",
            f"{b['headings'][0]}: Use your Authors Pilot page as the single destination for readers from social, email, and ads.",
            f"{b['headings'][1]}: Add Amazon or website purchase links, then share one URL everywhere while tracking outbound clicks.",
            f"{b['headings'][2]}: Keep 100% royalties—Authors Pilot never takes a commission on book sales.",
        ]
    # keep first 6 paragraphs max for page sections
    b["body"] = b["body"][:8]

out.parent.mkdir(parents=True, exist_ok=True)
out.write_text(json.dumps(blogs, indent=2, ensure_ascii=False), encoding="utf-8")
print("Wrote", out, "bytes", out.stat().st_size)
