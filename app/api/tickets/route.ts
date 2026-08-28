import { desc, eq } from "drizzle-orm";
import { getDb } from "../../../db";
import { knowledgeArticles, serviceTickets, ticketAssessments } from "../../../db/schema";
import { assessTicket } from "../../../lib/ticket-intelligence";

export async function GET() {
  const db = getDb();
  const tickets = await db.select().from(serviceTickets).orderBy(desc(serviceTickets.createdAt)).limit(50);
  return Response.json({ tickets });
}

export async function POST(request: Request) {
  const payload = await request.json() as Partial<{ title: string; description: string; requester: string; service: string; priority: string }>;
  if (!payload.title?.trim() || !payload.description?.trim() || !payload.requester?.trim() || !payload.service?.trim() || !payload.priority?.trim()) {
    return Response.json({ error: "title, description, requester, service and priority are required." }, { status: 400 });
  }
  const db = getDb();
  const ticketId = crypto.randomUUID();
  const createdAt = new Date().toISOString();
  const ticket = { id: ticketId, title: payload.title.trim(), description: payload.description.trim(), requester: payload.requester.trim(), service: payload.service.trim(), priority: payload.priority.trim(), status: "analysed", createdAt };
  const articles = await db.select().from(knowledgeArticles).where(eq(knowledgeArticles.service, ticket.service));
  const intelligence = assessTicket(ticket, articles);
  await db.batch([
    db.insert(serviceTickets).values(ticket),
    db.insert(ticketAssessments).values({ id: crypto.randomUUID(), ticketId, category: intelligence.category, assignmentGroup: intelligence.assignmentGroup, recommendation: intelligence.recommendation, escalationRequired: intelligence.escalationRequired, confidence: intelligence.confidence, createdAt }),
  ]);
  return Response.json({ ticket, assessment: intelligence, retrievedSources: intelligence.knowledge.map(({ article, score }) => ({ id: article.id, title: article.title, sourceUrl: article.sourceUrl, score })) }, { status: 201 });
}
