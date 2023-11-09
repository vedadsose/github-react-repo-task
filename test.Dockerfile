FROM node:18.13.0-alpine
WORKDIR /app
COPY package.json .
COPY package-lock.json .
RUN npm i
COPY . .

CMD ["npm", "run", "test-ci"]
