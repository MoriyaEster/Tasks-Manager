# Use Node.js LTS version
FROM node:18

# Set working directory
WORKDIR /app

# Copy package files from backend/
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Expose the application port
EXPOSE 5000

# Start the application
CMD ["npm", "run", "dev"]
