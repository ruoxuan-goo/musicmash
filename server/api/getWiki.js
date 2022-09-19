const axios = require("axios");

// this function fetches more information about the artist
// input: name of the artist
// return: description and an image from wikipedia
// https://wikimedia.org/api/rest_v1/
async function getWiki(artist) {
  url = `https://en.wikipedia.org/api/rest_v1/page/summary/${artist}`;

  let wiki = {};

  await axios
    .get(url)
    .then((res) => {
      return res.data;
    })
    .then((res) => {
      return { description: res.extract, imgurl: res.originalimage.source };
    })
    .then((data) => {
      wiki = data; // final data
    })
    .catch((err) => {
      console.log(err);
      wiki = null;
    });
  return wiki;
}

module.exports.getWiki = getWiki;
