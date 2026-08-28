CREATE TABLE `evidence_sources` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`record_id` text NOT NULL,
	`source` text NOT NULL,
	`excerpt` text NOT NULL,
	`confidence` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `intelligence_records` (
	`id` text PRIMARY KEY NOT NULL,
	`process` text NOT NULL,
	`activity` text NOT NULL,
	`role` text NOT NULL,
	`future_skill` text NOT NULL,
	`impact_type` text NOT NULL,
	`confidence` integer NOT NULL,
	`rationale` text NOT NULL,
	`created_at` text NOT NULL
);
