import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const intelligenceRecords = sqliteTable("intelligence_records", {
  id: text("id").primaryKey(), process: text("process").notNull(), activity: text("activity").notNull(), role: text("role").notNull(),
  futureSkill: text("future_skill").notNull(), impactType: text("impact_type").notNull(), confidence: integer("confidence").notNull(), rationale: text("rationale").notNull(), createdAt: text("created_at").notNull(),
});
export const evidenceSources = sqliteTable("evidence_sources", {
  id: integer("id").primaryKey({ autoIncrement: true }), recordId: text("record_id").notNull(), source: text("source").notNull(), excerpt: text("excerpt").notNull(), confidence: integer("confidence").notNull(),
});
