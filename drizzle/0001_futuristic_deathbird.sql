CREATE TABLE `knowledge_articles` (
	`id` text PRIMARY KEY NOT NULL,
	`title` text NOT NULL,
	`service` text NOT NULL,
	`content` text NOT NULL,
	`source_url` text NOT NULL,
	`updated_at` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `service_tickets` (
	`id` text PRIMARY KEY NOT NULL,
	`title` text NOT NULL,
	`description` text NOT NULL,
	`requester` text NOT NULL,
	`service` text NOT NULL,
	`priority` text NOT NULL,
	`status` text DEFAULT 'new' NOT NULL,
	`created_at` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `ticket_assessments` (
	`id` text PRIMARY KEY NOT NULL,
	`ticket_id` text NOT NULL,
	`category` text NOT NULL,
	`assignment_group` text NOT NULL,
	`recommendation` text NOT NULL,
	`escalation_required` integer NOT NULL,
	`confidence` integer NOT NULL,
	`created_at` text NOT NULL
);
