import { defineConfig } from "drizzle-kit";
export default defineConfig({
  dialect: "postgresql",
  schema: "./utils/schema.js",
  out: "./drizzle",
  dbCredentials:{
    url:'postgresql://db_owner:nvouNdQ06BKW@ep-shy-glitter-a50s0ky3.us-east-2.aws.neon.tech/db?sslmode=require',
  }
});