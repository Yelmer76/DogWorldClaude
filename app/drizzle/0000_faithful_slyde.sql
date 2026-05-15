CREATE TABLE `application_matches` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`application_id` text NOT NULL,
	`label` text NOT NULL,
	`status` text NOT NULL,
	FOREIGN KEY (`application_id`) REFERENCES `applications`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `applications` (
	`id` text PRIMARY KEY NOT NULL,
	`litter_id` text,
	`applicant` text NOT NULL,
	`city` text NOT NULL,
	`status` text NOT NULL,
	`status_label` text NOT NULL,
	`summary` text NOT NULL,
	`received_at` text NOT NULL,
	`assigned_puppy_id` text,
	FOREIGN KEY (`litter_id`) REFERENCES `litters`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `dog_achievements` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`dog_id` text NOT NULL,
	`year_short` text NOT NULL,
	`text` text NOT NULL,
	`ordinal` integer DEFAULT 0 NOT NULL,
	FOREIGN KEY (`dog_id`) REFERENCES `dogs`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `dog_health_tests` (
	`dog_id` text NOT NULL,
	`scheme` text NOT NULL,
	`value` text NOT NULL,
	`status` text NOT NULL,
	`scheme_org` text,
	`cert_url` text,
	`date` text,
	`valid_until` text,
	PRIMARY KEY(`dog_id`, `scheme`),
	FOREIGN KEY (`dog_id`) REFERENCES `dogs`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `dog_notes` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`dog_id` text NOT NULL,
	`body` text NOT NULL,
	`created_at` text NOT NULL,
	FOREIGN KEY (`dog_id`) REFERENCES `dogs`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `dogs` (
	`id` text PRIMARY KEY NOT NULL,
	`kennel_id` text,
	`titles` text NOT NULL,
	`name` text NOT NULL,
	`call_name` text,
	`sex` text NOT NULL,
	`breed` text NOT NULL,
	`country` text NOT NULL,
	`born` text NOT NULL,
	`deceased` text,
	`color` text,
	`microchip` text,
	`breeder` text NOT NULL,
	`sire_id` text,
	`dam_id` text,
	`status` text DEFAULT 'active' NOT NULL,
	`personality` text,
	`public_visible` integer DEFAULT true NOT NULL,
	`shared_to_genealogy` integer DEFAULT true NOT NULL,
	`hidden` integer DEFAULT false NOT NULL,
	FOREIGN KEY (`kennel_id`) REFERENCES `kennels`(`id`) ON UPDATE no action ON DELETE set null
);
--> statement-breakpoint
CREATE TABLE `kennels` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`affix` text NOT NULL,
	`affix_position` text DEFAULT 'suffix' NOT NULL,
	`city` text NOT NULL,
	`country` text NOT NULL,
	`founded` integer NOT NULL,
	`breed` text NOT NULL,
	`owners` text NOT NULL,
	`affiliations` text DEFAULT '' NOT NULL,
	`karma_tier` text DEFAULT 'ny' NOT NULL,
	`ethics_verified` integer DEFAULT false NOT NULL,
	`ethics_confirmed_at` text
);
--> statement-breakpoint
CREATE TABLE `litters` (
	`id` text PRIMARY KEY NOT NULL,
	`kennel_id` text,
	`letter` text NOT NULL,
	`call_name` text NOT NULL,
	`poetic` text,
	`sire_id` text NOT NULL,
	`dam_id` text NOT NULL,
	`mating_date` text NOT NULL,
	`whelping_date` text NOT NULL,
	`delivery_date` text NOT NULL,
	`week_of_age` integer NOT NULL,
	`status` text NOT NULL,
	`total` integer NOT NULL,
	`males` integer NOT NULL,
	`females` integer NOT NULL,
	`available` integer NOT NULL,
	`applications_total` integer NOT NULL,
	FOREIGN KEY (`kennel_id`) REFERENCES `kennels`(`id`) ON UPDATE no action ON DELETE set null
);
--> statement-breakpoint
CREATE TABLE `puppies` (
	`id` text PRIMARY KEY NOT NULL,
	`litter_id` text NOT NULL,
	`color` text NOT NULL,
	`color_label` text NOT NULL,
	`sex` text NOT NULL,
	`name` text,
	`status` text NOT NULL,
	`status_label` text NOT NULL,
	`weight` real NOT NULL,
	`trend` text NOT NULL,
	`delta` text NOT NULL,
	`notes` text,
	`assigned_to` text,
	`tone` text NOT NULL,
	FOREIGN KEY (`litter_id`) REFERENCES `litters`(`id`) ON UPDATE no action ON DELETE cascade
);
