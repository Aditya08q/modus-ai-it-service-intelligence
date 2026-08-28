export type TicketInput = { title: string; description: string; service: string; priority: string };
export type KnowledgeCandidate = { id: string; title: string; service: string; content: string; sourceUrl: string };

const categoryRules = [
  { category: "Identity & access", assignmentGroup: "Identity Operations", terms: ["password", "login", "access", "mfa", "account", "permission"] },
  { category: "Network & connectivity", assignmentGroup: "Network Support", terms: ["vpn", "wifi", "network", "internet", "connection"] },
  { category: "Device support", assignmentGroup: "Workplace Technology", terms: ["laptop", "screen", "printer", "device", "keyboard"] },
  { category: "Business application", assignmentGroup: "Application Support", terms: ["application", "portal", "error", "system", "outlook"] },
];

function terms(value: string) { return value.toLowerCase().match(/[a-z0-9]{3,}/g) ?? []; }

export function retrieveKnowledge(ticket: TicketInput, articles: KnowledgeCandidate[]) {
  const inputTerms = new Set(terms(`${ticket.title} ${ticket.description} ${ticket.service}`));
  return articles.map((article) => ({ article, score: terms(`${article.title} ${article.content} ${article.service}`).filter((term) => inputTerms.has(term)).length }))
    .filter((result) => result.score > 0)
    .sort((left, right) => right.score - left.score)
    .slice(0, 3);
}

export function assessTicket(ticket: TicketInput, articles: KnowledgeCandidate[]) {
  const body = `${ticket.title} ${ticket.description}`.toLowerCase();
  const match = categoryRules.map((rule) => {
    const termMatches = rule.terms.filter((term) => body.includes(term)).length;
    const serviceMatch = rule.category.toLowerCase().includes(ticket.service.toLowerCase()) ? 3 : 0;
    return { rule, matches: termMatches + serviceMatch };
  }).sort((left, right) => right.matches - left.matches)[0];
  const knowledge = retrieveKnowledge(ticket, articles);
  const urgent = ticket.priority === "P1" || ticket.priority === "P2" || /security|data loss|outage|all users/.test(body);
  const category = match?.matches ? match.rule.category : "General service request";
  const assignmentGroup = match?.matches ? match.rule.assignmentGroup : "Service Desk";
  const confidence = Math.min(96, 58 + (match?.matches ?? 0) * 12 + knowledge.length * 6);
  const escalationRequired = urgent || confidence < 70;
  return { category, assignmentGroup, confidence, escalationRequired, knowledge, recommendation: escalationRequired ? "Escalate to the assigned support group with retrieved evidence." : "Present the highest-ranked approved knowledge article to the analyst for validation." };
}
