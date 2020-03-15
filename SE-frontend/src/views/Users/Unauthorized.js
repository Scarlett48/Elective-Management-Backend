import React from "react";
import { Link } from "react-router-dom";

const Unauthorized = () => {
  return (
    <div>
      <div className="container">
        <div className="message">
          <h1>403 - You Shall Not Pass</h1>
          <p>
            You haven't been authenticated yet !!!
            <br />
            Maybe you have a typo in the url? Or you meant to go to a different
            location? Like...Login?
          </p>
        </div>
        <p>
          <Link to="/">Back to Home</Link>
        </p>
      </div>
    </div>
  );
};

export default Unauthorized;
