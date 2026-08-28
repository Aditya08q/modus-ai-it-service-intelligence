import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const intelligenceRecords = sqliteTable("intelligence_records", {
  id: text("id").primaryKey(), process: text("process").notNull(), activity: text("activity").notNull(), role: text("role").notNull(),
  futureSkill: text("future_skill").notNull(), impactType: text("impact_type").notNull(), confidence: integer("confidence").notNull(), rationale: text("rationale").notNull(), createdAt: text("created_at").notNull(),
});
export const evidenceSources = sqliteTable("evidence_sources", {
  id: integer("id").primaryKey({ autoIncrement: true }), recordId: text("record_id").notNull(), source: text("source").notNull(), excerpt: text("excerpt").notNull(), confidence: integer("confidence").notNull(),
});

export const serviceTickets = sqliteTable("service_tickets", {
  id: text("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  requester: text("requester").notNull(),
  service: text("service").notNull(),
  priority: text("priority").notNull(),
  status: text("status").notNull().default("new"),
  createdAt: text("created_at").notNull(),
});

export const knowledgeArticles = sqliteTable("knowledge_articles", {
  id: text("id").primaryKey(),
  title: text("title").notNull(),
  service: text("service").notNull(),
  content: text("content").notNull(),
  sourceUrl: text("source_url").notNull(),
  updatedAt: text("updated_at").notNull(),
});

export const ticketAssessments = sqliteTable("ticket_assessments", {
  id: text("id").primaryKey(),
  ticketId: text("ticket_id").notNull(),
  category: text("category").notNull(),
  assignmentGroup: text("assignment_group").notNull(),
  recommendation: text("recommendation").notNull(),
  escalationRequired: integer("escalation_required", { mode: "boolean" }).notNull(),
  confidence: integer("confidence").notNull(),
  createdAt: text("created_at").notNull(),
});
