#!/bin/sh
set -e

# Reemplazamos placeholder por la variable real
: "${VITE_API_BASE_URL:=http://localhost:8080/}"

sed -i "s|__API_BASE_URL__|${VITE_API_BASE_URL}|g" /app/dist/config.js

# Ejecutamos el CMD original
exec "$@"
