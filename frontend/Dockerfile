# ─── 1) BUILD etapa ──────────────────────────────────
FROM node:20-alpine AS build
WORKDIR /app

# 1.1) Instalo dependencias (copiando solo package.json y lockfile)
COPY package.json package-lock.json* ./
RUN npm ci --silent

# 1.2) Copio el resto de la app y genero el build estático
COPY . .
RUN npm run build

# ─── 2) SERVE etapa ──────────────────────────────────
FROM nginx:1.25-alpine
# 2.1) Copio los assets estáticos al servidor Nginx
COPY --from=build /app/dist /usr/share/nginx/html

# 2.2) Exposicion de puerto y comando de arranque
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
