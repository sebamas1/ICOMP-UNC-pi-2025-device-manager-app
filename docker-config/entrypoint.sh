#!/bin/sh
set -e

# Solo default si la variable no está definida. Si viene vacía (p. ej. Helm para Ingress
# mismo origen en app.local → /api), respetar "" y no pisar con localhost.
if [ -z "${VITE_API_BASE_URL+x}" ]; then
  VITE_API_BASE_URL="http://localhost:8080"
fi

# Copiar el template a config.js y reemplazar el placeholder
cp /app/dist/config-template.js /app/dist/config.js
sed -i "s|__API_BASE_URL__|${VITE_API_BASE_URL}|g" /app/dist/config.js

exec "$@"
