# Technology and licence inventory

| Component | Purpose | Licence / cost position |
| --- | --- | --- |
| React + TypeScript | Web user interface | MIT / free and open source |
| Vinext + Cloudflare Worker runtime | API layer | Open source tooling; locally runnable |
| Cloudflare D1 / SQLite | Persistent relational data | SQLite is public domain; D1 is replaceable with local SQLite |
| Drizzle ORM | Typed schema and migrations | Apache-2.0 |
| Explainable classification engine | Ticket classification and escalation | Project source; no external paid model required |
| Optional Ollama + local model | Natural-language analyst summaries | Locally runnable; model licence selected and documented separately |

The running decision path does not require a paid API. If a free external service becomes unavailable, the system continues to classify tickets with the local deterministic engine and locally stored knowledge base.
