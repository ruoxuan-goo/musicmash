const axios = require("axios");
require("dotenv").config();

// this function fetches the first api
// input: track name from user input
// return: attributes of a music e.g. track name, artist, genre...
// https://developer.musixmatch.com/documentation/api-reference/track-search
async function getTrack(query) {
  // set parameter
  const API_KEY = process.env.TRACKAPI;
  const pagesize = 1;
  const page = 1;
  const trackrating = "desc"; // highest rating to lowest

  const url = `http://api.musixmatch.com/ws/1.1/track.search?page_size=${pagesize}&page=${page}&s_track_rating=${trackrating}&apikey=${API_KEY}&`;
  const trackPath = `q_track=${query}`;
  const trackURL = url + trackPath;

  let track = {};

  await axios
    .get(trackURL)
    .then((res) => {
      // if track is not valid, the array will be empty
      if (res.data.message.body.track_list[0] === undefined) {
        track = { status: "Invalid query" };
      } else {
        let data = res.data.message.body.track_list[0].track;
        track.trackname = data.track_name;
        track.genre =
          data.primary_genres.music_genre_list[0].music_genre.music_genre_name;
        track.artist = data.artist_name;
        track.album = data.album_name;
        track.rating = data.track_rating;
        track.trackurl = data.track_share_url;
      }
    })
    // if there is error set track to null
    .catch((err) => {
      console.log(err);
      track = null;
    });

  return track;
}

module.exports.getTrack = getTrack;
