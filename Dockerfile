# # Use Node.js LTS version as base image
# FROM node:lts-alpine

# # Set the working directory
# WORKDIR /app

# # Copy package.json and package-lock.json
# COPY package*.json ./

# # Install dependencies
# RUN npm install --production

# # Copy the rest of the application
# COPY . .

# # Build TypeScript
# RUN npm run build

# # Expose the port the app runs on
# EXPOSE 8000

# # Define the command to run the app
# CMD ["node", "dist/app.js"]

FROM node:lts-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

FROM node:lts-alpine

WORKDIR /app

COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist

EXPOSE 8000

CMD ["node", "dist/app.js"]
