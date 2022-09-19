const axios = require("axios");
require("dotenv").config();

// this function gets the other songs by the same artist
// input: artist name of the first track fetched
// return: the artist's top 5 songs based on ratings
// https://developer.musixmatch.com/documentation/api-reference/track-search
async function getMoreTracks(artist) {
  // set params
  const API_KEY = process.env.TRACKAPI;
  const pagesize = 5;
  const page = 1;
  const trackrating = "desc"; // highest rating to lowest

  const url = `http://api.musixmatch.com/ws/1.1/track.search?page_size=${pagesize}&page=${page}&s_track_rating=${trackrating}&apikey=${API_KEY}&`;
  const artistPath = `q_artist=${artist}`;
  const artistURL = url + artistPath;

  let tracks = {};

  await axios
    .get(artistURL)
    .then((res) => {
      return res.data.message.body.track_list;
    })
    .then((res) => {
      // for each music in musics, map attributes
      return res.map((x) => {
        return {
          trackname: x.track.track_name,
          artist: x.track.artist_name,
          album: x.track.album_name,
          rating: x.track.track_rating,
          trackurl: x.track.track_share_url,
        };
      });
    })
    .then((data) => {
      tracks = data; // final data
    })
    .catch((err) => {
      console.log(err);
      tracks = null;
    });

  return tracks;
}

module.exports.getMoreTracks = getMoreTracks;
