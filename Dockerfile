# Stage 1: Build the Angular application
FROM node:20 AS build-stage

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the Angular app in production mode
RUN npm run build --prod

# Stage 2: Serve the Angular app with Nginx
FROM nginx:alpine AS production-stage

# Copy the build output from the first stage to the Nginx web directory
COPY --from=build-stage /app/dist/shopshop-front usr/share/nginx/html

# Copy custom Nginx configuration file if needed (optional)
# COPY nginx.conf /etc/nginx/nginx.conf

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
