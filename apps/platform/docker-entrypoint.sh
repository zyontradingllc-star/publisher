#!/bin/sh
set -e

mkdir -p /app/media

# One-time seed into the mounted volume (ephemeral disk loses Payload uploads).
if [ -n "$MEDIA_SEED_URL" ] && [ ! -f /app/media/.seeded ]; then
  echo "[media] seeding from MEDIA_SEED_URL…"
  if wget -q -O /tmp/media-sync.zip "$MEDIA_SEED_URL"; then
    unzip -qo /tmp/media-sync.zip -d /app/media
    rm -f /tmp/media-sync.zip
    touch /app/media/.seeded
    echo "[media] seed complete"
  else
    echo "[media] seed download failed (continuing)"
  fi
fi

chown -R nextjs:nodejs /app/media 2>/dev/null || true
exec su-exec nextjs node server.js
