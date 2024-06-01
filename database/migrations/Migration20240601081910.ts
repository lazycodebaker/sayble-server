import { Migration } from '@mikro-orm/migrations';

export class Migration20240601081910 extends Migration {

  async up(): Promise<void> {
    this.addSql('PRAGMA foreign_keys = OFF;');
    this.addSql('CREATE TABLE `_knex_temp_alter085` (`id` text NOT NULL, `first_name` text NOT NULL, `last_name` text NOT NULL, `username` text, `email` text NOT NULL, `password` text, `dob` datetime NOT NULL DEFAULT 1717229950414, `image` text NOT NULL, `is_verified` integer NOT NULL, `is_logged_in` integer NOT NULL, `otp` text NOT NULL, `salt` text NOT NULL, `created_at` datetime NOT NULL DEFAULT 1717229950416, `updated_at` datetime NOT NULL DEFAULT 1717229950416, PRIMARY KEY (`id`));');
    this.addSql('INSERT INTO "_knex_temp_alter085" SELECT * FROM "User";;');
    this.addSql('DROP TABLE "User";');
    this.addSql('ALTER TABLE "_knex_temp_alter085" RENAME TO "User";');
    this.addSql('PRAGMA foreign_keys = ON;');
  }

}
