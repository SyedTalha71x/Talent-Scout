# Stage 1: Build the Next.js application
FROM node:20 AS builder
WORKDIR /app

# Copy package.json and package-lock.json and install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the Next.js app
RUN npm run build

# Stage 2: Set up the production environment
FROM node:16
WORKDIR /app

# Copy the build files from the builder stage
COPY --from=builder /app ./

# Expose the port Next.js will run on
EXPOSE 3000

# Start the Next.js app in production mode
CMD ["npm", "run", "start"]
