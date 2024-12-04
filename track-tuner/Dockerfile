# Use an official Node.js image
FROM node:20

ARG REACT_APP_SPOTIFY_API_KEY
ENV REACT_APP_SPOTIFY_API_KEY=$REACT_APP_SPOTIFY_API_KEY

# Set working directory
WORKDIR /app

# Copy dependencies
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application
COPY . .

# Build the React app
RUN npm run build

# Use NGINX to serve the app
FROM nginx:stable-alpine

# Copy the built React app to NGINX
COPY --from=0 /app/build /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start NGINX
CMD ["nginx", "-g", "daemon off;"]