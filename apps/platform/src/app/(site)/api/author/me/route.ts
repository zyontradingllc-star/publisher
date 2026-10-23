import { getCurrentAuthor } from "@/lib/payload/get-current-author";

export const dynamic = "force-dynamic";

/** GET /api/author/me — current Payload author from verified Firebase token/session. */
export async function GET(request: Request) {
  const author = await getCurrentAuthor(request);
  if (!author) {
    return Response.json(
      { ok: false, message: "Unauthorized." },
      { status: 401 }
    );
  }
  return Response.json({ ok: true, author });
}
