CREATE TABLE `magic_tokens` (
	`token` text PRIMARY KEY NOT NULL,
	`email` text NOT NULL,
	`expires_at` text NOT NULL,
	`consumed_at` text
);
--> statement-breakpoint
CREATE TABLE `sessions` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`expires_at` text NOT NULL,
	`created_at` text NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` text PRIMARY KEY NOT NULL,
	`email` text NOT NULL,
	`name` text NOT NULL,
	`kennel_id` text,
	`created_at` text NOT NULL,
	FOREIGN KEY (`kennel_id`) REFERENCES `kennels`(`id`) ON UPDATE no action ON DELETE set null
);
--> statement-breakpoint
CREATE UNIQUE INDEX `users_email_unique` ON `users` (`email`);