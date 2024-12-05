import { pgTable, serial,text,varchar } from "drizzle-orm/pg-core";

export const AiInterview = pgTable('db',{
    id:serial('id').primaryKey(),
    jsonResponse:text('jsonResponse').notNull(),
    jobPosition:varchar('jobPosition').notNull(),
    jobDesc:varchar('jobDesc').notNull(),
    jobExperience:varchar('jobExperience').notNull(),
    createdBy:varchar('createdBy').notNull(),
    createdAt:varchar('createdAt'),
    mockId:varchar('mockId').notNull()
})