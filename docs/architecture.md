# IT Service Desk Intelligence Architecture

```text
Ticket intake UI
      ↓
Ticket API and validation
      ↓
Knowledge retrieval + explainable classification
      ↓
Persistent tickets, assessments and evidence in D1
      ↓
Role / process / skill intelligence dashboard
```

The classification layer uses transparent rules for ticket category, assignment group, confidence and escalation. Knowledge retrieval ranks approved articles by shared ticket terms. A local Ollama model may later create a concise analyst summary, but it must not replace the persisted evidence or deterministic decision trail.

## Scale path

For 1,000+ processes or high ticket volume, ticket ingestion becomes asynchronous: API validation writes a queue record, a worker runs retrieval and classification in batches, and UI queries are paginated by status, service and assignment group. D1 indexes should follow the service and status filters used by the dashboard.
