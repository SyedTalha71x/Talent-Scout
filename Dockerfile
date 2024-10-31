# Use Node.js 18 as the base image for the build stage
FROM node:18 AS builder
WORKDIR /app

# Copy package.json and package-lock.json and install dependencies
COPY package.json package-lock.json ./
RUN npm ci

# Copy the rest of the application code
COPY . .

# Build the Next.js app
RUN npm run build

# Stage 2: Set up the production environment
FROM node:18
WORKDIR /app

# Copy the build files from the builder stage
COPY --from=builder /app ./

# Set the ALLOWED_ORIGINS environment variable for CORS
# Replace these values with your actual allowed origins
ENV ALLOWED_ORIGINS=http://localhost:3000

# Expose the port Next.js will run on
EXPOSE 3000

# Start the Next.js app in production mode
CMD ["npm", "run", "start"]