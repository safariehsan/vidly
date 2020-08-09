import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const Jumbotron = (props) => {
  return (
    <div className="jumbotron text-center">
      <h1>Counter Component</h1>
      <h3>Total values greater than Zero </h3>
      <h3>
        <span className="badge badge-pill badge-warning">
          {props.total.length}
        </span>
      </h3>
    </div>
  );
};
export default Jumbotron;
