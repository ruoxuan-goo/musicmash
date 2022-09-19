const axios = require("axios");
require("dotenv").config();

// for each of the top 5 musics of the artist, get a youtube video
// input: string of an artist + a track name e.g. "Ed Sheeran Photograph"
// return: string of url + video id e.g. https://www.youtube.com/embed/qgmXPCX4VzU
// https://developers.google.com/youtube/v3/docs/search
async function getVideo(artist, trackname) {
  //AIzaSyBWIgcP6eFLf6rM0iZhSvVpx8zVhslEOPo
  //AIzaSyB1ipndMMWpWQRbJmrif4uZox5M03M0gcI
  //AIzaSyABlcbnckcB5IVG54WTI0gvfrwgZE6bz3k
  const param = {
    api_KEY: process.env.YOUTUBEAPI,
    maxResult: 1,
  };

  const query = artist + " " + trackname;

  const url = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=${param.maxResult}&q=${query}&type=video&videoEmbeddable=true&key=${param.api_KEY}`;

  let id = "";
  await axios
    .get(url)
    .then((res) => {
      console.log(res.data.items[0]);
      return res.data.items[0].id.videoId;
    })
    .then((resid) => {
      id = resid;
    })
    .catch((err) => {
      console.log(err);
      id = null;
    });
  return id;
}

module.exports.getVideo = getVideo;
