from pathlib import Path

p = Path(
    r"c:\Users\PC\Desktop\projects\next-js\book\apps\platform\src\lib\blog\posts-generated.ts"
)
t = p.read_text(encoding="utf-8")
t = t.replace('import type { BlogPost } from "./posts";\n\n', "")
t = t.replace(
    "export const GENERATED_BLOG_POSTS: BlogPost[] = [",
    "export const GENERATED_BLOG_POSTS = [",
)
t = t.replace(" as BlogPost['category']", "")
p.write_text(t, encoding="utf-8")
print("ok", p.stat().st_size)
