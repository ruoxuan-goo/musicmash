const axios = require("axios");
require("dotenv").config();

// this function fetches the recent tweets of the artist
// input: the name of the artist
// return: 10 recent original tweets (not retweet), in english relevant to the artist
async function getTweets(artist) {
  const maxresult = 10;
  // filter: lang is en and isRetweet is false
  const config = {
    method: "get",
    url: `https://api.twitter.com/2/tweets/search/recent?query=${artist}%20lang%3Aen%20-is%3Aretweet&max_results=${maxresult}&expansions=author_id&sort_order=recency`,
    headers: {
      Authorization: process.env.TWIBEARER,
      Cookie:
        'guest_id=v1%3A166313416139306162; guest_id_ads=v1%3A166313416139306162; guest_id_marketing=v1%3A166313416139306162; personalization_id="v1_hoDv0ko326LxZUKNCcSbAQ=="',
    },
  };

  let tweets = {};

  await axios(config)
    .then((res) => {
      return res.data.data;
    })
    .then((res) => {
      return res.map((x) => {
        return x.text;
      });
    })
    .then((data) => {
      tweets = data; // final data
    })
    .catch((err) => {
      console.log(err);
      tweets = null;
    });
  return tweets;
}

module.exports.getTweets = getTweets;
