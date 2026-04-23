#!/usr/bin/env bash
# Always bind dev to 8080: free the port first (stale Next.js / other listeners).
set -e
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

# Some environments (certain sandboxes / file watcher backends) can hit Watchpack EMFILE errors.
# Polling is slower but far more robust and avoids exhausting watch handles.
export WATCHPACK_POLLING="${WATCHPACK_POLLING:-true}"

pids_for_port() {
  lsof -tiTCP:8080 -sTCP:LISTEN 2>/dev/null || true
}

PIDS=$(pids_for_port)
if [[ -n "$PIDS" ]]; then
  echo "Freeing port 8080…"
  kill -TERM $PIDS 2>/dev/null || true
  sleep 0.5
  PIDS=$(pids_for_port)
  if [[ -n "$PIDS" ]]; then
    kill -KILL $PIDS 2>/dev/null || true
    sleep 0.2
  fi
fi

if [[ "${1:-}" == "--webpack" ]]; then
  exec ./node_modules/.bin/next dev -H localhost -p 8080
else
  exec ./node_modules/.bin/next dev --turbopack -H localhost -p 8080
fi
