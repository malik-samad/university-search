FROM node:18.16.0-alpine as base

WORKDIR /app

# Add package file
COPY package*.json ./

# Install deps
RUN npm install

COPY . .

# Build dist
RUN yarn build

# Start production image build
FROM node:18.16.0-alpine

# Copy node modules and build directory
COPY --from=base ./app/node_modules ./node_modules
COPY --from=base ./app/build /


# Expose port 80
EXPOSE 80
CMD ["server.js"]