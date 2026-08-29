import { assessTicket } from "../../../../lib/ticket-intelligence";
import { getDb } from "../../../../db";
import { knowledgeArticles, serviceTickets, ticketAssessments } from "../../../../db/schema";

type IncomingTicket = { title: string; description: string; requester: string; service: string; priority: string };
export async function POST(request: Request) {
  const payload = await request.json() as { tickets?: IncomingTicket[] };
  if (!Array.isArray(payload.tickets) || payload.tickets.length === 0 || payload.tickets.length > 100) return Response.json({ error: "Provide between 1 and 100 tickets." }, { status: 400 });
  const db = getDb();
  const articles = await db.select().from(knowledgeArticles);
  const output = [];
  for (const item of payload.tickets) {
    if (!item.title || !item.description || !item.requester || !item.service || !item.priority) return Response.json({ error: "Every ticket needs title, description, requester, service and priority." }, { status: 400 });
    const ticket = { ...item, id: crypto.randomUUID(), status: "analysed", createdAt: new Date().toISOString() };
    const assessment = assessTicket(ticket, articles.filter((article) => article.service === ticket.service));
    await db.batch([db.insert(serviceTickets).values(ticket), db.insert(ticketAssessments).values({ id: crypto.randomUUID(), ticketId: ticket.id, category: assessment.category, assignmentGroup: assessment.assignmentGroup, recommendation: assessment.recommendation, escalationRequired: assessment.escalationRequired, confidence: assessment.confidence, createdAt: ticket.createdAt })]);
    output.push({ ticketId: ticket.id, category: assessment.category, confidence: assessment.confidence });
  }
  return Response.json({ processed: output.length, assessments: output }, { status: 201 });
}
