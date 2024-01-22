# Musicmash - Mash-up App

MusicMash is a cutting-edge single-page web application featuring a server-side mash-up experience. Users can query a track name to access comprehensive information, including ratings, genre, album details, artist biography, recent tweets, and top five hits with videos, presented through a modern interface. Targeted at music enthusiasts, the application consolidates data from various sources, enriching the user's music exploration.

MusicMash is deployed in a Docker container on an Amazon EC2 instance for universal accessibility beyond the local host.

![Homepage](/assets/homepage.png)

![Search results](/assets//screenshot.png)

## Services Used

MusixMatch API [docs](https://developer.musixmatch.com/documentation/api-reference/track-search)

YouTube API [docs](https://youtube.googleapis.com/youtube/v3/search)

Twitter API [docs](https://developer.twitter.com/en/docs/twitter-api/tweets/search/api-reference/get-tweets-search-recent)

WikipediaAPI [docs](https://wikimedia.org/api/rest_v1/)

Node image [link](https://hub.docker.com/_/node)

## Solution Architecture

### Client

The client directory was created using [Create React App](https://reactjs.org/docs/create-a-new-react-app.html).

### Server

The server directory was created by following the Express [Hello World Example](https://expressjs.com/en/starter/hello-world.html) and static assets are served following the Express [Serving Static Files Example](https://expressjs.com/en/starter/static-files.html).

![Architecture diagram](/assets//diagram.png)

## Getting Started

```bash
# Build your client application first
cd client
npm run build

# Start the server
cd ../server
node index.js

# Open your browser and navigate to localhost:3000
```
