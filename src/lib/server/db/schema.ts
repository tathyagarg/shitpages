import { pgTable, serial, text } from 'drizzle-orm/pg-core';

export const user = pgTable('user', {
  id: text('id').primaryKey(),
  subdomain: text('subdomain'),
  uuid: text('uuid').notNull(),
  accessToken: text('access_token').notNull(),
});

