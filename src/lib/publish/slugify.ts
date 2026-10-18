export function slugifyTitle(title: string) {
  const slug = title
    .toLowerCase()
    .replace(/['’]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 72);
  return slug || "preview";
}

export function storefrontUrl(title: string) {
  return `https://authorspilot.com/store/${slugifyTitle(title)}/`;
}
