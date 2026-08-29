# Modus AI — IT Service Desk Intelligence Graph

An enterprise AI application for tracing how AI changes work across IT service operations. It implements Assignment 11 from the Modus Enterprise AI Build Challenge.

## What it demonstrates

- A usable frontend for exploring the IT Service Desk operating model.
- Persistent D1 data model for intelligence records and their evidence sources.
- Backend APIs to create, retrieve and systematically assess multiple activity cases.
- An explainable impact engine that classifies activities as **Automate**, **Augment** or **Redesign** using observable inputs: standardisation, data quality, decision risk and human judgment.
- Traceability from each role-impact recommendation to source evidence, confidence and future-critical skills.

## Architecture

`React UI → Cloudflare Worker API → D1 intelligence records + evidence sources → explainable assessment engine → optional local Ollama enrichment`

The assessment engine is deliberately deterministic: an LLM may help summarize evidence or draft analyst-facing language, but the decision and confidence remain grounded in persisted inputs. This prevents an untraceable generic-chat response from becoming the system of record.

## Main API routes

- `GET /api/intelligence` retrieves stored records with linked evidence.
- `POST /api/intelligence` validates and persists a complete intelligence record.
- `POST /api/analyze` assesses many activity cases in a single request.
- `GET` / `POST /api/knowledge` manages approved, traceable IT knowledge articles.
- `GET` / `POST /api/tickets` retrieves and analyses individual service tickets.
- `POST /api/tickets/batch` processes up to 100 tickets systematically.

Example analysis request:

```json
{"cases":[{"activity":"Bid comparison","standardisation":92,"dataQuality":88,"decisionRisk":25,"humanJudgment":35}]}
```

## Run locally

1. Install dependencies with `npm ci`.
2. Generate the D1 migration with `npm run db:generate`.
3. Run `npm run dev`.

For the complete local ticket workflow, initialize the local database once with `npx wrangler d1 migrations apply DB --local`.

The deployment configuration declares a `DB` D1 binding. Apply the generated migration before demonstrating write operations.

## Demo narrative

Start at the role impact map, select **Service Desk Analyst**, and show the connected activities and changing skills. Then select **Ticket classification** to expose its evidence trail and explain why the activity is marked `Automate` rather than a generic LLM conclusion. Finally, submit multiple activities to `/api/analyze` to show the same governed logic applied consistently at scale.
