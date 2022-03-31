# syntax=docker/dockerfile:1
FROM mcr.microsoft.com/playwright:v1.20.0-focal

RUN mkdir -p /app
WORKDIR /app 
COPY . /app
RUN npm ci

#RUN npx playwright test

CMD ["npx", "playwright", "test"]
