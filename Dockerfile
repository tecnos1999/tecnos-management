# Stage 1: Build the application
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json package-lock.json ./

# Install dependencies (including sharp for image optimization)
RUN npm install && npm install sharp

# Copy the rest of the application code
COPY . .

# Build the application
RUN npm run build

# Debugging step to verify the build output
RUN ls -la .next

# Stage 2: Serve the application
FROM node:18-alpine AS runner

# Set NODE_ENV to production
ENV NODE_ENV=production

# Set working directory
WORKDIR /app

# Install only production dependencies
COPY package.json package-lock.json ./
RUN npm install --only=production

# Copy built files from builder stage
COPY --from=builder /app/.next ./.next

# Copy node_modules from builder stage (to have all dependencies)
COPY --from=builder /app/node_modules node_modules

# Debugging step to verify the copied build files in runner
RUN ls -la .next

# Expose the port on which the Next.js app will run
EXPOSE 3001

# Start the Next.js application
CMD ["npm", "run", "start"]
