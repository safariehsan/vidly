import React, { Component } from "react";
import Counter from "./counter";

class Counters extends Component {
 constructor(props){
   super(props);
 }
  render() {
    console.log('counters render');
    const {length, counters, onDelete, onIncrement, onDecrement} = this.props;
    if (length === 0)
      return (
        <div className="container mt-5 text-center">
          <span className="alert alert-danger">No Counter Found!</span>
        </div>
      );
    return (
      <React.Fragment>
        {counters.map((counter) => (
          <Counter
            counterId={counter.id}
            onDelete={onDelete}
            key={counter.id}
            onIncrement={onIncrement}
            onDecrement={onDecrement}
            value={counter.value}
          >
            <strong style={{ color: "red" }}>Counter #{counter.id + 1}</strong>
          </Counter>
        ))}
      </React.Fragment>
    );
  }
}

export default Counters;
