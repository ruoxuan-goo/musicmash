import React from "react";

// component that displays error message
export default function Error(props) {
  return (
    <div className="loading">
      {Object.values(props.msg).length !== 0 ? (
        <h1>Opps! {props.msg}</h1>
      ) : (
        <h1>There is an error!</h1>
      )}
    </div>
  );
}
