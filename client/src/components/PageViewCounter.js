import React, { useEffect, useState } from "react";
import axios from "axios";

export default function PageViewCounter() {
  const [count, setCount] = useState("");
  const [error, setError] = useState(false);

  function fetchVisitor() {
    const config = {
      method: "POST",
      url: "http://localhost:3000/visitorcount",
    };

    axios
      .post(config.url)
      .then((res) => {
        return res.data;
      })
      .then((c) => {
        setCount(c);
        setError(false);
      })
      .catch(function (error) {
        setError(true);
        console.log(error);
      });
  }

  useEffect(() => {
    fetchVisitor();
  }, []);

  return (
    <div>
      {error ? (
        <div className="counter">
          <p>Page counter display fail</p>
        </div>
      ) : (
        <div className="counter">
          <p>
            The number of page visitors to-date is {count} . Copyright Musicmash
          </p>
        </div>
      )}
    </div>
  );
}
