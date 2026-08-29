import { desc } from "drizzle-orm";
import { getDb } from "../../../db";
import { knowledgeArticles } from "../../../db/schema";

export async function GET() {
  const db = getDb();
  return Response.json({ articles: await db.select().from(knowledgeArticles).orderBy(desc(knowledgeArticles.updatedAt)).limit(100) });
}

export async function POST(request: Request) {
  const payload = await request.json() as Partial<{ title: string; service: string; content: string; sourceUrl: string }>;
  if (!payload.title?.trim() || !payload.service?.trim() || !payload.content?.trim() || !payload.sourceUrl?.trim()) return Response.json({ error: "title, service, content and sourceUrl are required." }, { status: 400 });
  const article = { id: crypto.randomUUID(), title: payload.title.trim(), service: payload.service.trim(), content: payload.content.trim(), sourceUrl: payload.sourceUrl.trim(), updatedAt: new Date().toISOString() };
  await getDb().insert(knowledgeArticles).values(article);
  return Response.json({ article }, { status: 201 });
}
