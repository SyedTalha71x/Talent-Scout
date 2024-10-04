FROM node:18-alpine

WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install --production

# Copy the rest of the application code
COPY . ./

# Build the Next.js application
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
