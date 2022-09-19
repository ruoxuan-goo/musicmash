const express = require("express");
const https = require("https");
const http = require("http");
const axios = require("axios");
const logger = require("morgan");

// import api
const trackApi = require("../api/getTrack");
const moreTracksApi = require("../api/getMoreTracks");
const tweetsApi = require("../api/getTweets");
const wikiApi = require("../api/getWiki");
const videoApi = require("../api/getVideo");

const router = express.Router();

// for morgan
router.use(logger("tiny"));

router.get("/:query", async (req, res) => {
  const query = req.params.query;
  let track = {};

  // fetch from api and handle exceptions
  try {
    track.searchTrack = await trackApi.getTrack(query);
    // if connection to api failed
    if (track.searchTrack === null) {
      throw "Unable to get track";
    }
    // if user enters an invalid query
    if (track.searchTrack.status === "Invalid query") {
      throw "Invalid query";
    }

    // remove 'feat. artist' in artist name
    // e.g. Ed Sheeren feat. Macklemore, return Ed Sheeran
    // then assign it back to track.searchTrack.artist
    let finalArtist = track.searchTrack.artist;
    if (finalArtist.includes("feat") === true) {
      let remove_after = finalArtist.indexOf("feat");
      finalArtist = finalArtist.substring(0, remove_after);
      track.searchTrack.artist = finalArtist;
    }

    track.similarTracks = await moreTracksApi.getMoreTracks(finalArtist);

    if (track.similarTracks === null) {
      throw "Unable to get similar tracks";
    }

    track.wiki = await wikiApi.getWiki(finalArtist);
    if (track.wiki === null) {
      throw "Unable to get wiki";
    }

    track.twitter = await tweetsApi.getTweets(finalArtist);
    if (track.twitter === null) {
      throw "Unable to get twitter";
    }

    await Promise.all(
      await track.similarTracks.map(async function (x) {
        x.id = await videoApi.getVideo(x.artist, x.trackname);
        if (x.id === null) {
          throw "Unable to get videos";
        }
      })
    );

    // return final data
    return res.status(200).json({
      error: false,
      message: track,
    });
  } catch (err) {
    if (err === "Invalid query") {
      return res.status(400).json({
        error: true,
        message: err,
      });
    } else {
      // if it is other api issue
      return res.status(404).json({
        error: true,
        message: err,
      });
    }
  }
});

module.exports = router;
