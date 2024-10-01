# Build stage
# Latest node version, named as frontend-build
FROM node:20 AS frontend-build

# Rename root of directory
WORKDIR /app

# Copy dependencies to image
COPY package*.json ./

# Install all dependencies
RUN npm install

# Copy everything else
COPY . .

# Build the application
RUN npm run build

# Production stage
# Slim version of node for lightweight build
FROM node:slim AS runner

# Copy content from the build stage
COPY --from=frontend-build /app/.next ./.next
# COPY --from=frontend-build /app/public ./public
COPY --from=frontend-build /app/package*.json ./

# Only install production dependencies
RUN npm install --only=production

# Container listens to the specified network port
# Automatically exposed to 3000, this should match the port specified in
# applications.properties. compose.yml handles the port assignement anyway.
EXPOSE 3000

# Start application
ENTRYPOINT [ "npm", "run", "start"]
