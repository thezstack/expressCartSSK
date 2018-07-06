FROM node:latest
ENV NODE_VERSION 8.9.4
RUN mkdir -p /var/expressCart
WORKDIR /var/expressCart

# COPY bin/ /var/expressCart/bin/
COPY config/ /var/expressCart/config/
COPY public/ /var/expressCart/public/
COPY routes/ /var/expressCart/routes/
COPY views/ /var/expressCart/views/
COPY lib/ /var/expressCart/lib/
COPY app.js /var/expressCart/
COPY package.json /var/expressCart/
COPY gulpfile.js /var/expressCart/

RUN npm install

VOLUME /var/expressCart/data 

EXPOSE 1111
CMD ["npm", "start"]