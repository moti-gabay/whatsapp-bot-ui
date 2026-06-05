import dotenv from 'dotenv';

// Load .env file into process.env before anything else imports this module
dotenv.config();

function requireEnv(key: string): string {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
  return value;
}

export const env = {
  MONGODB_URI: requireEnv('MONGODB_URI'),
  PORT: requireEnv('PORT')
} as const;
