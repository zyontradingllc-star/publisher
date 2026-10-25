"""Crop 5x10 blog image grid and assign each tile to the matching blog by heading."""
from __future__ import annotations

import json
import re
from difflib import SequenceMatcher
from pathlib import Path

from PIL import Image

# Photo lifestyle grid (shows clearly on blog cards). Prefer local copy, then Downloads.
_GRID_CANDIDATES = [
    Path(r"c:\Users\PC\Desktop\projects\next-js\book\scripts\assets\AuthorsPilot_50-Panel_Photo_Grid.png"),
    Path(r"C:\Users\PC\Downloads") / "AuthorsPilot_ 50-Panel Author Marketing Guide.png",
]
GRID = next((p for p in _GRID_CANDIDATES if p.exists()), _GRID_CANDIDATES[0])
OUT_DIR = Path(r"c:\Users\PC\Desktop\projects\next-js\book\apps\platform\public\blog")
MARKETING_OUT = Path(r"c:\Users\PC\Desktop\projects\next-js\book\public\blog")
POSTS_JSON = Path(
    r"c:\Users\PC\Desktop\projects\next-js\book\apps\platform\src\lib\blog\generated-50.json"
)
POSTS_TS = Path(
    r"c:\Users\PC\Desktop\projects\next-js\book\apps\platform\src\lib\blog\posts-generated.ts"
)

# Photo grid 1098x1433 — gutter scan + equal rows under title bar.
COL_BOUNDS = [
    (2, 218),
    (228, 438),
    (448, 651),
    (661, 870),
    (879, 1095),
]
_TITLE = 50
_GH = 1433 - _TITLE
_CH = _GH / 10
ROW_BOUNDS = [
    (_TITLE + int(i * _CH) + 2, _TITLE + int((i + 1) * _CH) - 2) for i in range(10)
]

# Headings printed on each grid panel (row-major), for title matching.
GRID_HEADINGS = [
    "How I Created My Free Author Page in 10 Minutes (No Website Needed)",
    "Author Link in Bio: One Link That Shows All Your Books",
    "Books2Read vs Authors Pilot: I Tested Both—Here's What I Found",
    "Booklinker Alternative Free: Why I Switched to Authors Pilot",
    "One Link for All My Books: How to Stop Sharing 10 Different Links",
    "QR Code For Book Link: How I Use It on Bookmarks & Events",
    "Custom Book URL: Why Your Amazon Link Looks Unprofessional",
    "Keep 100% Book Royalties: What It Really Means (0% Commission Truth)",
    "Sell Books Direct to Readers Without Amazon: My Setup",
    "How I Sell Books on My Own Website and Keep All The Money",
    "Book Platform No Commission: I Compared 5 Platforms",
    "Direct Sales vs Retailer Sales: Where I Make More Money",
    "Payment Options for Selling Books Direct (PayPal, Stripe, etc.)",
    "How Authors Make Money in 2026: My 3 Income Streams",
    "How I Track My Book Link Clicks (Which Book Gets Most Interest?)",
    "UTM Links for Authors: I Found Which Instagram Post Sold My Book",
    "Best Social Platform for Book Sales: My Click Data After 30 Days",
    "Google Analytics for Authors: Simple Setup for Your Author Page",
    "Promote Your Book on Instagram Without Spamming (My 3-Post Formula)",
    "BookTok for Authors: How I Got 500 Views With One Video + One Link",
    "Share Book Link on WhatsApp: The Message That Gets Clicked",
    "Book Launch Announcement Post: The Exact Text I Used",
    "10 Social Media Post Ideas for Authors Who Hate Marketing",
    "Book Link in Email Signature: How Every Email Sells Your Book",
    "My Book Launch Social Media Plan: 7 Days, One Link",
    "What is Authors Pilot? Free Author Page + One Link Explained",
    "Is Authors Pilot Free? Pricing, 0% Commission Explained",
    "Author Landing Page That Converts: 5 Examples I Copied",
    "What to Put on an Author Page: My Checklist (Bio, Photo, Books)",
    "Author Bio for Book Listing: How I Write It in 50 Words",
    "How to List Your Book Online: Step-by-Step on Authors Pilot",
    "List Your Book for Free: What You Need Before You Start",
    "Book Cover Requirements for Listing: Size, Format, Mistakes",
    "How to Write a Book Description That Gets Clicks",
    "Add Purchase Links to Book Listing: Amazon + Own Website",
    "List a Book Already on Amazon: Add It to Authors Pilot in 5 Min",
    "Sell Books Without Amazon: 5 Ways I Sell Direct",
    "Sell EBooks From Your Website: Files, Delivery, Payments",
    "Build Author Email List: Where Readers Sign Up (Free Tools)",
    "How to Price a Book: Ebook, Paperback, Hardcover (2026)",
    "Promote Book on Facebook: Page, Groups, Posts That Work",
    "Promote Book on Pinterest: Pins That Drive Book Sales",
    "LinkedIn for Nonfiction Authors: Build Authority + Sell Books",
    "YouTube Book Promotion: Video Ideas That Bring Readers",
    "Amazon Author Central vs Author Pages Which One Do You Need?",
    "Goodreads Author Profile Vs Author Page: I Use Both (Here's Why)",
    "Link in Bio Tools for Authors: Compared: Free vs Paid (2026)",
    "Indie Book Discovery Sites for Authors: Where Readers Find You",
    "Do Authors Need a Website in 2026? Author Page vs Full Site",
    "Build Your Author Brand: More Readers, More Sales",
]


def norm(s: str) -> str:
    s = s.lower()
    s = s.replace("—", "-").replace("–", "-").replace("'", "'")
    s = re.sub(r"[^a-z0-9]+", " ", s)
    return re.sub(r"\s+", " ", s).strip()


def score(a: str, b: str) -> float:
    return SequenceMatcher(None, norm(a), norm(b)).ratio()


def main() -> None:
    assert len(GRID_HEADINGS) == 50
    assert len(COL_BOUNDS) == 5 and len(ROW_BOUNDS) == 10

    posts = json.loads(POSTS_JSON.read_text(encoding="utf-8"))
    assert len(posts) == 50, len(posts)

    # Greedy best-match: panel -> post by title/h1
    pairs: list[tuple[float, int, int]] = []
    for pi, heading in enumerate(GRID_HEADINGS):
        for qi, post in enumerate(posts):
            s = max(score(heading, post["title"]), score(heading, post.get("h1", "")))
            pairs.append((s, pi, qi))
    pairs.sort(reverse=True)

    panel_to_post: dict[int, int] = {}
    used_posts: set[int] = set()
    for s, pi, qi in pairs:
        if pi in panel_to_post or qi in used_posts:
            continue
        if s < 0.35:
            continue
        panel_to_post[pi] = qi
        used_posts.add(qi)

    # Assign leftovers by remaining order
    leftover_panels = [i for i in range(50) if i not in panel_to_post]
    leftover_posts = [i for i in range(50) if i not in used_posts]
    for pi, qi in zip(leftover_panels, leftover_posts):
        panel_to_post[pi] = qi
        print(f"FALLBACK panel {pi+1} -> post {qi+1} ({posts[qi]['slug']})")

    print("Matches:")
    for pi in range(50):
        qi = panel_to_post[pi]
        s = max(
            score(GRID_HEADINGS[pi], posts[qi]["title"]),
            score(GRID_HEADINGS[pi], posts[qi].get("h1", "")),
        )
        flag = " *" if s < 0.55 else ""
        print(f"  {pi+1:02d} ({s:.2f}){flag} -> {posts[qi]['slug'][:55]}")

    im = Image.open(GRID).convert("RGB")
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    for old in OUT_DIR.glob("*.webp"):
        old.unlink()
    for old in OUT_DIR.glob("blog-*.jpg"):
        old.unlink()

    # post index -> public path
    post_images: dict[int, str] = {}
    for pi in range(50):
        row, col = divmod(pi, 5)
        t, b = ROW_BOUNDS[row]
        l, r = COL_BOUNDS[col]
        tile = im.crop((l, t, r, b))

        # Upscale photo tiles for card / OG display
        target_w = 1200
        scale = target_w / tile.width
        tile = tile.resize(
            (target_w, max(1, int(tile.height * scale))),
            Image.Resampling.LANCZOS,
        )
        from PIL import ImageFilter

        tile = tile.filter(ImageFilter.UnsharpMask(radius=1.2, percent=120, threshold=2))

        qi = panel_to_post[pi]
        slug = posts[qi]["slug"]
        fname = f"{slug}.webp"
        OUT_DIR.mkdir(parents=True, exist_ok=True)
        MARKETING_OUT.mkdir(parents=True, exist_ok=True)
        tile.save(OUT_DIR / fname, "WEBP", quality=92, method=6)
        tile.save(MARKETING_OUT / fname, "WEBP", quality=92, method=6)
        post_images[qi] = f"/blog/{fname}"
        print(f"saved {fname} ({tile.size[0]}x{tile.size[1]})")

    for qi, post in enumerate(posts):
        public = post_images[qi]
        post["image"] = public
        post["imageAlt"] = f"{post['h1']} — Authors Pilot blog cover"

    POSTS_JSON.write_text(
        json.dumps(posts, indent=2, ensure_ascii=False) + "\n", encoding="utf-8"
    )

    # Prefer regenerating TS from JSON (avoids regex backref bugs with alts like "10 ...")
    import subprocess
    import sys

    emit = Path(__file__).with_name("emit-posts-from-json.py")
    subprocess.check_call([sys.executable, str(emit)])
    print(f"Updated {POSTS_JSON.name} + regenerated {POSTS_TS.name}")
    print(f"Done: {len(post_images)} images -> {OUT_DIR}")


if __name__ == "__main__":
    main()
