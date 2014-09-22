# container for remotestorage
# docker build -t remotestorage:latest .
# docker run -d -P remotestorage:latest
FROM dockerfile/nodejs

RUN apt-get update
RUN apt-get -y install git

RUN git clone https://github.com/rsbohn/starter-kit.git /opt/remotestorage

WORKDIR /opt/remotestorage
RUN npm install

ENV PUBLIC_IP 127.0.0.1
ENV STORAGE_PORT 4000
ENV PORTAL_PORT 4001
EXPOSE 4000 4001
EXPOSE 8000 8001 8002 8003 8004 8005 8006 8007
CMD ["node", "/opt/remotestorage/starter-kit"]
