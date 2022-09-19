import React from "react";

// home component
export default function Home() {
  return (
    <div className="loading">
      <h1>Welcome to Musicmash</h1>
      <iframe
        src="https://giphy.com/embed/qHi0tciYxU2MVq34hR"
        width="480"
        height="270"
        frameBorder="0"
        className="giphy-embed"
        allowFullScreen
      ></iframe>
      <h5>There is nothing to display now.. start searching for a song</h5>
      <h5>
        Here are some ideas: Hello, Just the way you are, Memories, 100 ways,
        Photograph, Postcard etc.
      </h5>
    </div>
  );
}
