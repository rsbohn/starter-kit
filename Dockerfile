# container for remotestorage
# docker build -t remotestorage:latest
# docker run -d -p 8001:8001 -p 8002:8002 remotestorage:latest
FROM ubuntu

RUN curl -sL https://deb.nodesource.com/setup | bash -

RUN apt-get update
RUN apt-get -y install nodejs

RUN git clone https://github.com/remotestorage/starter-kit.git /opt/remotestorage

WORKDIR /opt/remotestorage
RUN npm install

EXPOSE 8001 8002
CMD ["node", "/opt/remotestorage/starter-kit"]
