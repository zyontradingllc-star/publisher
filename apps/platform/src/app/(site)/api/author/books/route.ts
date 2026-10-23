import { getPayloadClient, isPayloadConfigured } from "@/lib/payload";
import {
  getCurrentAuthor,
  isCurrentAuthor,
  requireCurrentAuthor,
} from "@/lib/payload/get-current-author";

export const dynamic = "force-dynamic";

/** GET /api/author/books — books owned by the verified author only. */
export async function GET(request: Request) {
  const authorOrRes = await requireCurrentAuthor(request);
  if (!isCurrentAuthor(authorOrRes)) return authorOrRes;

  if (!isPayloadConfigured()) {
    return Response.json(
      { ok: false, message: "Payload is not configured." },
      { status: 503 }
    );
  }

  const payload = await getPayloadClient();
  const result = await payload.find({
    collection: "books",
    where: { author: { equals: authorOrRes.id } },
    limit: 50,
    sort: "-updatedAt",
    depth: 0,
    overrideAccess: true,
    context: { firebaseUid: authorOrRes.firebaseUid },
  });

  return Response.json({
    ok: true,
    books: result.docs.map((doc) => {
      const d = doc as {
        id: string | number;
        title?: string;
        slug?: string;
        status?: string;
        approvalStatus?: string;
      };
      return {
        id: String(d.id),
        title: d.title ?? "Untitled",
        slug: d.slug ?? "",
        status: d.status ?? "draft",
        approvalStatus: d.approvalStatus ?? "PENDING",
      };
    }),
  });
}

/** POST /api/author/books — create a draft book for the verified author (ignores any client author id). */
export async function POST(request: Request) {
  const authorOrRes = await requireCurrentAuthor(request);
  if (!isCurrentAuthor(authorOrRes)) return authorOrRes;

  if (!isPayloadConfigured()) {
    return Response.json(
      { ok: false, message: "Payload is not configured." },
      { status: 503 }
    );
  }

  let body: { title?: string; description?: string; language?: string } = {};
  try {
    body = (await request.json()) as typeof body;
  } catch {
    return Response.json(
      { ok: false, message: "Invalid JSON body." },
      { status: 400 }
    );
  }

  const title = String(body.title || "").trim();
  if (title.length < 2) {
    return Response.json(
      { ok: false, message: "Title is required." },
      { status: 400 }
    );
  }

  // Explicitly ignore any client-sent author / authorId fields.
  const payload = await getPayloadClient();
  const slugBase = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 60);
  const slug = `${slugBase || "book"}-${authorOrRes.id.slice(-6)}`;

  const created = await payload.create({
    collection: "books",
    data: {
      title,
      slug,
      description: String(body.description || "").trim() || undefined,
      language: String(body.language || "en"),
      author: authorOrRes.id,
      status: "draft",
      approvalStatus: "PENDING",
    },
    overrideAccess: true,
    context: { firebaseUid: authorOrRes.firebaseUid },
  });

  return Response.json({
    ok: true,
    book: { id: String(created.id), title, slug },
  });
}
