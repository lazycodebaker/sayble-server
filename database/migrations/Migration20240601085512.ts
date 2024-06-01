import { Migration } from '@mikro-orm/migrations';

export class Migration20240601085512 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table `User` (`id` text not null, `first_name` text not null, `last_name` text not null, `username` text null, `email` text not null, `password` text null, `dob` datetime not null default 1717232112068, `image` text not null, `is_verified` integer not null, `is_logged_in` integer not null, `otp` text not null, `salt` text not null, `created_at` datetime not null default 1717232112069, `updated_at` datetime not null default 1717232112069, primary key (`id`));');
  }

}
