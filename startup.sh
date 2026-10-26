#!/bin/sh
set -eu
# Restart contract: idempotent — exits 0 when the dev server is already
# healthy, otherwise starts it in the background. Works from any checkout
# location (resolves the project root relative to this script).
cd "$(dirname "$0")"
node scripts/preview.mjs stop || true
if curl -sf -o /dev/null --max-time 2 http://127.0.0.1:8080/; then
  exit 0
fi
npm run dev >>/tmp/app-startup.log 2>&1 &
