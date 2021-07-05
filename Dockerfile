FROM node:12.6.0-alpine

WORKDIR /app

# copy package,json and package .lock to work directory
COPY package*.json ./

ARG NODE_ENV
RUN if [ "$NODE_ENV" = "local" ]; \
  then npm install; \
  else npm install --only=production; \
  fi

RUN npm install

# copy everything over to the container
COPY . .

ENV PORT 5001

EXPOSE $PORT

ARG NODE_ENV
RUN if [ "$NODE_ENV" = "local" ]; \
  then npm run local; \
  else npm start; \
  fi