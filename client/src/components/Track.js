import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

// component that displays user's query and information about the track
export default function Track(props) {
  return (
    <div>
      <div className="title">
        <h2>You searched for</h2>
        <h1 className="trackname">{props.trackname}</h1>
        <a href={props.url} class="btn" role="button">
          <i class="bi bi-play-circle-fill"></i>Listen now
        </a>
      </div>
      <div className="info">
        <h6>
          Rating <span className="rating">{props.rating}</span> .
        </h6>
        <h6>Album {props.album} . </h6>
        <h6>Genre {props.genre}</h6>
      </div>
    </div>
  );
}
