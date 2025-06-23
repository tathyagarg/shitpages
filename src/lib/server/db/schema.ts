import { pgTable, serial, text } from 'drizzle-orm/pg-core';

export const user = pgTable('user', {
  id: serial('id').primaryKey(),
});

export const sessions = pgTable('session', {
  uuid: text('uuid').primaryKey(),
  accessToken: text('access_token').notNull(),
})

