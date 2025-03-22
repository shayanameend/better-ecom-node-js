import "dotenv/config";

import * as zod from "zod";

const envSchema = zod.object({
  NODE_ENV: zod.enum(["development", "production"]),
  PORT: zod.coerce.number(),
  APP_NAME: zod.string(),
  APP_SUPPORT_EMAIL: zod.string().email(),
  APP_ADMIN_EMAIL: zod.string().email(),
  NODEMAILER_HOST: zod.string(),
  NODEMAILER_PORT: zod.coerce.number(),
  NODEMAILER_SECURE: zod.preprocess(
    (val) => (val === "true" ? true : val === "false" ? false : val),
    zod.boolean(),
  ),
  NODEMAILER_EMAIL: zod.string().email(),
  NODEMAILER_PASSWORD: zod.string(),
  TURSO_DATABASE_URL: zod.string().url(),
  TURSO_AUTH_TOKEN: zod.string(),
  BETTER_AUTH_SECRET: zod.string(),
  AWS_ACCESS_KEY_ID: zod.string(),
  AWS_SECRET_ACCESS_KEY: zod.string(),
  AWS_BUCKET: zod.string(),
  AWS_REGION: zod.string(),
});

export const env = envSchema.parse(process.env);
