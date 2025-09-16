#!/bin/sh
set -e

: "${VITE_API_BASE_URL:=http://localhost:8080/}"

# Copiar el template a config.js y reemplazar el placeholder
cp /app/dist/config-template.js /app/dist/config.js
sed -i "s|__API_BASE_URL__|${VITE_API_BASE_URL}|g" /app/dist/config.js

exec "$@"
