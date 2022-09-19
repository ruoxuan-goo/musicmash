import React from "react";

// component that displays recent tweets about the artist
export default function Tweets(props) {
  return (
    <div className="tweets">
      <h3>RECENT ON TWITTER</h3>
      {props.tweets.map((tweet) => (
        <p className="card">{tweet}</p>
      ))}
    </div>
  );
}
