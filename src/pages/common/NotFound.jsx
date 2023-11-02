import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <center className="container">
      <LazyLoadImage
        style={{ width: `100%`, height: "80vh" }}
        src="https://img.freepik.com/free-vector/oops-404-error-with-broken-robot-concept-illustration_114360-5529.jpg?w=2000"
        effect="blur"
      />
      <br />
      <Link to={"/"}>
        <button className="hero-button">Back Home</button>
      </Link>
    </center>
  );
};

export default NotFound;
