import { createEnv } from "@t3-oss/env-nextjs"
import { z } from "zod"

export const env = createEnv({
  server: {
    // This is optional because it's only used in development.
    // See https://next-auth.js.org/deployment.
    NEXTAUTH_URL: z.string().url().optional(),
    NEXTAUTH_SECRET: z.string().min(1),
    GOOGLE_CLIENT_ID: z.string().min(1),
    GOOGLE_CLIENT_SECRET: z.string().min(1),
    DATABASE_URL: z.string().min(1),
    COINMARKETCAP_URL: z.string().min(1),
    COINMARKETCAP_API: z.string().min(1),
    LEMON_SQUEEZY_API_KEY: z.string().min(1),
    LEMON_SQUEEZY_STORE_ID: z.string().min(1),
    LEMON_SQUEEZY_BASIC_MONTHLY_PLAN_ID: z.string().min(1),
    LEMON_SQUEEZY_PRO_MONTHLY_PLAN_ID: z.string().min(1),
    KRANKEN_API_KEY: z.string().min(1),
    KRANKEN_SECRET_KEY: z.string().min(1),
  },
  client: {
    NEXT_PUBLIC_APP_URL: z.string().min(1),
  },
  runtimeEnv: {
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
    DATABASE_URL: process.env.DATABASE_URL,
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
    COINMARKETCAP_URL: process.env.COINMARKETCAP_URL,
    COINMARKETCAP_API: process.env.COINMARKETCAP_API,
    LEMON_SQUEEZY_API_KEY: process.env.LEMON_SQUEEZY_API_KEY,
    LEMON_SQUEEZY_STORE_ID: process.env.LEMON_SQUEEZY_STORE_ID,
    LEMON_SQUEEZY_BASIC_MONTHLY_PLAN_ID:
      process.env.LEMON_SQUEEZY_BASIC_MONTHLY_PLAN_ID,
    LEMON_SQUEEZY_PRO_MONTHLY_PLAN_ID:
      process.env.LEMON_SQUEEZY_PRO_MONTHLY_PLAN_ID,
    KRANKEN_API_KEY: process.env.KRAKEN_API_KEY,
    KRANKEN_SECRET_KEY: process.env.KRAKEN_SECRET_KEY,
  },
})
