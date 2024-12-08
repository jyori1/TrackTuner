# Stage 1: Build the React application
FROM node:20 as build

ARG REACT_APP_SPOTIFY_API_KEY
ENV REACT_APP_SPOTIFY_API_KEY=$REACT_APP_SPOTIFY_API_KEY

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json first to leverage Docker cache
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application
COPY . ./

# Build the application
RUN npm run build

# Stage 2: Serve the application using NGINX
FROM nginx:stable-alpine

# Copy the build output to the NGINX directory
COPY --from=build /app/build /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start NGINX
CMD ["nginx", "-g", "daemon off;"]
