import React from "react";

// component that displays information about the artist
export default function ArtistBio(props) {
  return (
    <div className="artistbio">
      <h3>ARTIST</h3>
      <img src={props.imgurl} alt="artist-img"></img>
      <h3>{props.artist}</h3>
      <p>{props.bio}</p>
    </div>
  );
}
