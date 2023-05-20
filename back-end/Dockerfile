FROM node:16
    
WORKDIR /app

COPY ./ ./

RUN npm install

CMD ["npm", "start", "--host", "0.0.0.0"]