# Musicmash - Mash-up App

MusicMash is a cutting-edge single-page web application featuring a server-side mash-up experience. Users can query a track name to access comprehensive information, including ratings, genre, album details, artist biography, recent tweets, and top five hits with videos, presented through a modern interface. Targeted at music enthusiasts, the application consolidates data from various sources, enriching the user's music exploration.

Powered by DynamoDB for tracking page visits, MusicMash is deployed in a Docker container on an Amazon EC2 instance for universal accessibility beyond the local host. 

## Solution Architecture 

### Client
The client directory was created using [Create React App](https://reactjs.org/docs/create-a-new-react-app.html). 

### Server
The server directory was created by following the Express [Hello World Example](https://expressjs.com/en/starter/hello-world.html) and static assets are served following the Express [Serving Static Files Example](https://expressjs.com/en/starter/static-files.html). 


### Getting Started
``` bash
# Build your client application first
cd client
npm run build

# Start the server
cd ../server
node index.js

# Open your browser and navigate to localhost:3000
```
