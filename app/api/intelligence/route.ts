import { desc, eq } from "drizzle-orm";
import { getDb } from "../../../db";
import { evidenceSources, intelligenceRecords } from "../../../db/schema";

export async function GET() {
  const db = getDb();
  const records = await db.select().from(intelligenceRecords).orderBy(desc(intelligenceRecords.confidence));
  const evidence = await db.select().from(evidenceSources);
  return Response.json({ records: records.map((record) => ({ ...record, evidence: evidence.filter((item) => item.recordId === record.id) })) });
}
export async function POST(request: Request) {
  const payload = await request.json() as Partial<{ id: string; process: string; activity: string; role: string; futureSkill: string; impactType: string; confidence: number; rationale: string }>;
  if (!payload.id || !payload.process || !payload.activity || !payload.role || !payload.futureSkill || !payload.impactType || payload.confidence === undefined || !payload.rationale) return Response.json({ error: "A complete intelligence record is required." }, { status: 400 });
  const db = getDb();
  await db.insert(intelligenceRecords).values({ id: payload.id, process: payload.process, activity: payload.activity, role: payload.role, futureSkill: payload.futureSkill, impactType: payload.impactType, confidence: payload.confidence, rationale: payload.rationale, createdAt: new Date().toISOString() });
  const record = await db.select().from(intelligenceRecords).where(eq(intelligenceRecords.id, payload.id));
  return Response.json({ record: record[0] }, { status: 201 });
}
