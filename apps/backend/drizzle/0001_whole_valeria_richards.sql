PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_users` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`email` text NOT NULL,
	`password` text NOT NULL,
	`email_verified` integer DEFAULT false,
	`reset_token` text,
	`reset_token_expiry` text,
	`last_login` text,
	`created_at` text DEFAULT '2025-10-25T03:40:45.756Z' NOT NULL,
	`updated_at` text DEFAULT '2025-10-25T03:40:45.757Z' NOT NULL
);
--> statement-breakpoint
INSERT INTO `__new_users`("id", "name", "email", "password", "email_verified", "reset_token", "reset_token_expiry", "last_login", "created_at", "updated_at") SELECT "id", "name", "email", "password", "email_verified", "reset_token", "reset_token_expiry", "last_login", "created_at", "updated_at" FROM `users`;--> statement-breakpoint
DROP TABLE `users`;--> statement-breakpoint
ALTER TABLE `__new_users` RENAME TO `users`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
CREATE UNIQUE INDEX `users_email_unique` ON `users` (`email`);