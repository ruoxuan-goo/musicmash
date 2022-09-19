import React, { useEffect, useState, useRef } from "react";
import "./App.css";
import "./style/style.css";
import logo from "./img/logo.png";

import Home from "./components/Home";
import PageViewCounter from "./components/PageViewCounter";
import Track from "./components/Track";
import TopTracks from "./components/TopTracks";
import ArtistBio from "./components/ArtistBio";
import Loading from "./components/Loading";
import Error from "./components/Error";
import Tweets from "./components/Tweets";

function App() {
  const inputRef = useRef(null); // avoid re-render every time user input something

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState(null); // set and store query from search bar
  const [data, setData] = useState();

  const getUserInput = () => {
    // use ref returns an object current
    setQuery(inputRef.current.value);
  };

  // fetch from server
  async function fetchData() {
    const url = `/search/${query}`;

    let res = await fetch(url);
    let data = await res.json();
    // catch error responded from server
    // set error so error message can be displayed
    if (data.error === true) {
      setError(data.message);
      setData(null);
    } else {
      setError(null);
      return data.message;
    }
  }

  useEffect(() => {
    (async () => {
      try {
        if (query !== null) {
          setLoading(true);
          setData(await fetchData());
          setLoading(false);
        }
      } catch (err) {
        setError(err);
      }
    })();
  }, [query]); // fetch data everytime query changes

  function Search() {
    return (
      <div className="header">
        <img
          src={logo}
          alt="logo"
          className="logo"
          style={{ width: "60px", height: "60px" }}
        ></img>
        <div className="search-bar">
          <input placeholder="Search a song..eg. Hello" ref={inputRef} />
          <button onClick={getUserInput} variant="dark">
            <i className="bi bi-search"></i>
          </button>
        </div>
      </div>
    );
  }

  function ErrorPage() {
    return (
      <div>
        <Search />
        <Error msg={error} />
      </div>
    );
  }

  if (loading) {
    return <Loading />;
  } else if (error !== null) {
    return <ErrorPage />;
  } else {
    return (
      <div className="App">
        <Search />

        {data != null && data != "" ? (
          <div>
            <Track
              trackname={data.searchTrack.trackname}
              rating={data.searchTrack.rating}
              album={data.searchTrack.album}
              genre={data.searchTrack.genre}
              url={data.searchTrack.trackurl}
            />
            <div className="cards">
              <ArtistBio
                imgurl={data.wiki.imgurl}
                bio={data.wiki.description}
                artist={data.searchTrack.artist}
              />
              <Tweets artist={data.searchTrack.artist} tweets={data.twitter} />
            </div>

            <TopTracks
              artist={data.searchTrack.artist}
              tracks={data.similarTracks}
            />
            <PageViewCounter />
          </div>
        ) : (
          <Home />
        )}
      </div>
    );
  }
}

export default App;
