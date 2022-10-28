# build step

FROM node:18.12.0-alpine as build
WORKDIR /usr/src
COPY ./package*.json .
COPY ./tsconfig*.json .
COPY ./prisma ./prisma
RUN npm ci
COPY . .
RUN npm run build

# run step

FROM node:18.12.0-alpine
WORKDIR /usr/src
COPY ./package*.json ./
COPY ./prisma ./prisma
RUN npm ci
COPY --from=build /usr/src/dist ./dist