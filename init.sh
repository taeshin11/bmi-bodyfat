#!/usr/bin/env bash
# BMI Dashboard — project bootstrap script
# Usage: bash init.sh

set -e

echo "=== BMI Dashboard — Project Bootstrap ==="

# Check dependencies
command -v node >/dev/null 2>&1 && echo "✓ Node.js found" || echo "⚠ Node.js not found (optional)"
command -v vercel >/dev/null 2>&1 && echo "✓ Vercel CLI found" || echo "⚠ Vercel CLI not found (install: npm i -g vercel)"

# Start local dev server (Python or Node http-server or npx serve)
echo ""
echo "Starting local dev server..."
if command -v python3 >/dev/null 2>&1; then
  echo "→ Open http://localhost:8080 in your browser"
  python3 -m http.server 8080
elif command -v python >/dev/null 2>&1; then
  echo "→ Open http://localhost:8080 in your browser"
  python -m http.server 8080
elif command -v npx >/dev/null 2>&1; then
  echo "→ Open http://localhost:3000 in your browser"
  npx serve . -p 3000
else
  echo "⚠ No local server found. Install Python 3 or run: npm i -g serve"
  echo "  Then: serve . -p 3000"
fi
