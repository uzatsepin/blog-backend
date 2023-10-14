FROM --platform=linux/amd64 node:20.4.0
WORKDIR /usr/app
COPY . .
RUN npm install
EXPOSE 4444
CMD ["node", "index.js"]