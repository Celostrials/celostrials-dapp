// This file configures the initialization of Sentry on the server.
// The config you add here will be used whenever the server handles a request.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from "@sentry/nextjs"
import { config } from "./config/config"

Sentry.init({
  dsn: config.SENTRY_DSN,
  tracesSampleRate: 1.0,
  environment: config.APP_ENV,
  enabled: config.APP_ENV !== "local",
  release: config.COMMIT_SHA,
  // ...
  // Note: if you want to override the automatic release value, do not set a
  // `release` value here - use the environment variable `SENTRY_RELEASE`, so
  // that it will also get attached to your source maps
})
