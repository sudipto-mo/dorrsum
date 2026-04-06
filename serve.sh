#!/usr/bin/env bash
set -e
cd "$(dirname "$0")"

if [[ ! -d node_modules ]]; then
  echo "First run: installing dependencies (npm install)…"
  npm install
fi

echo "Starting Next.js (Turbopack) on http://localhost:8080"
echo "  (Do not use python -m http.server — this app needs Next.js for / and /api.)"
exec npm run dev
