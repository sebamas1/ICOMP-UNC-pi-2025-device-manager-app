FROM node:20-alpine

# Directorio de trabajo
WORKDIR /app

# Copiamos package.json y package-lock.json para instalar deps
COPY package*.json ./
RUN npm ci

# Copiamos el resto del código
COPY . .

# Variable de build para Vite o CRA
ARG VITE_API_BASE_URL
ENV VITE_API_BASE_URL=${VITE_API_BASE_URL}

# Build de producción
RUN npm run build

# Instalar 'serve' para servir los archivos estáticos
RUN npm install -g serve

# Exponer puerto
EXPOSE 3000

# Comando para servir la app
CMD ["serve", "-s", "dist", "-l", "3000"]
