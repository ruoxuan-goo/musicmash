import React from "react";

// component that displays video cards of the top 5 tracks by the artist
export default function TopTracks(props) {
  return (
    <div>
      <h2>TOP 5 TRACKS by {props.artist}</h2>
      <div className="topvideos">
        {props.tracks.map((track) => (
          <div className="video">
            <iframe
              src={"https://www.youtube.com/embed/" + track.id}
              title={track.id}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            ></iframe>
            <h4>{track.trackname}</h4>
            <div className="info">
              <p className="rating">{track.rating}</p>
              <p>Album {track.album}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
