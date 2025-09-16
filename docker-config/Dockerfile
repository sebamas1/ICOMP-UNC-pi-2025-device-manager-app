FROM node:20-alpine

# Directorio de trabajo
WORKDIR /app

# Copiamos package.json y package-lock.json para instalar deps
COPY package*.json ./
RUN npm ci

# Copiamos el resto del código
COPY . .

# Build de producción (ya no dependemos de VITE_API_BASE_URL)
RUN npm run build

# Instalar 'serve' para servir los archivos estáticos
RUN npm install -g serve

# Copiar script de entrypoint y darle permisos
COPY docker-config/entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

# Exponer puerto
EXPOSE 3000

# Usamos el entrypoint que reemplaza las vars en runtime
ENTRYPOINT ["/entrypoint.sh"]
CMD ["serve", "-s", "dist", "-l", "3000"]
