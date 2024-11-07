# Stage 1: Build the application
FROM node:18-alpine AS builder

WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install && npm install sharp

# Copy the rest of the application code
COPY . .

# Build the application
RUN npm run build

# Debugging step to verify the build output
RUN ls -la .next/static

# Stage 2: Serve the application
FROM node:18-alpine AS runner

ENV NODE_ENV=production
ENV REACT_APP_ENV=production

WORKDIR /app

# Install only production dependencies
COPY package.json package-lock.json ./
RUN npm install --only=production

# Copy the build output and dependencies from the builder stage
COPY --from=builder /app/.next .next
COPY --from=builder /app/node_modules node_modules
COPY --from=builder /app/.next/static .next/static

# Expose the port on which the Next.js app will run
EXPOSE 3001

# Start the Next.js application
CMD ["npm", "run", "start"]
