type ActivityCase = { activity: string; standardisation: number; dataQuality: number; decisionRisk: number; humanJudgment: number };

function classify(caseItem: ActivityCase) {
  const automation = Math.round((caseItem.standardisation * 0.45 + caseItem.dataQuality * 0.35 + (100 - caseItem.decisionRisk) * 0.2));
  const impact = automation >= 75 && caseItem.humanJudgment < 45 ? "Automate" : caseItem.humanJudgment >= 65 || caseItem.decisionRisk >= 65 ? "Augment" : "Redesign";
  return { ...caseItem, impact, confidence: Math.min(94, Math.max(58, automation)), reasoning: `Score combines standardisation (${caseItem.standardisation}), data quality (${caseItem.dataQuality}), decision risk (${caseItem.decisionRisk}) and human judgment (${caseItem.humanJudgment}).` };
}

export async function POST(request: Request) {
  const payload = await request.json() as { cases?: ActivityCase[] };
  if (!Array.isArray(payload.cases) || !payload.cases.length) return Response.json({ error: "Provide one or more activity cases." }, { status: 400 });
  if (payload.cases.some((item) => !item.activity || [item.standardisation, item.dataQuality, item.decisionRisk, item.humanJudgment].some((score) => typeof score !== "number" || score < 0 || score > 100))) return Response.json({ error: "Each case needs an activity and four scores from 0 to 100." }, { status: 400 });
  return Response.json({ assessments: payload.cases.map(classify), engine: "explainable-impact-v1" });
}
