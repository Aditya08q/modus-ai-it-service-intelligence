# 12-minute live demo script

1. **Problem (1 min):** Service desks receive repetitive tickets and need consistent routing with accountable human escalation.
2. **Architecture (1 min):** Show UI → API → classification/retrieval → D1 knowledge and ticket records → explainable output.
3. **Knowledge evidence (2 min):** Open the stored VPN troubleshooting article and explain that only stored approved guidance is used as evidence.
4. **Surprise record (4 min):** Enter a new ticket supplied by the panel. Show validation, classification, assignment group, confidence, escalation decision, and linked article.
5. **Persistence (2 min):** Refresh the page and show the same record in Recent Tickets.
6. **Scale (1 min):** Explain that `/api/tickets/batch` accepts up to 100 records per call; production scaling adds queued batch workers and indexed service/status queries.
7. **Governance (1 min):** Explain that low-confidence, high-priority, or security/outage tickets require escalation; the recommendation is traceable to saved inputs and source articles.
