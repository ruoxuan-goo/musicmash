FROM node:16.14.2

# Set basic AWS credentials and API Key variables
ENV ACCESS_KEY_ID 
ENV SECRET_ACCESS_KEY
ENV SESSION_TOKEN 
ENV QUTUSERNAME 
ENV TRACKAPI
ENV TWIBEARER
ENV YOUTUBEAPI

# Copy app source
COPY . /src

# Set working directory to source
WORKDIR /src/server

# install app dependencies
RUN npm install

# Export port to outside world
EXPOSE 3000

# start command as per package.json
CMD ["node", "index.js"]
