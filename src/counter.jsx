import React, { Component } from "react";
import Counters from "./components/counters";
import Jumbotron from './components/jumbotron';

class Counter extends Component {
  state = {
    lessthanzero: false,
    counters: [
      {
        id: 0,
        value: 2,
      },
      {
        id: 1,
        value: 0,
      },
      {
        id: 2,
        value: 6,
      },
    ],
  };
  constructor(props) {
    super(props);
    console.log("app constructor");
    //this.state = this.props.something;
  }
  componentDidMount() {
    // Ajax call
    console.log("app didmount");
  }
  handleDelete = (counterId) => {
    const counters = this.state.counters.filter((c) => c.id !== counterId);
    this.setState({
      counters,
    });
  };
  handleIncrement = (counterId) => {
    const counters = [...this.state.counters];
    const index = counters.findIndex((c) => c.id === counterId);
    counters[index].value++;
    this.setState({ counters });
  };
  handleDecrement = (counterId) => {
    const counters = [...this.state.counters];
    const index = counters.findIndex((c) => c.id === counterId);
    counters[index].value--;
    this.setState({ counters });
  };
  render() {
    console.log("app render");
    return (
      <React.Fragment>
        <Jumbotron total={this.state.counters.filter((c) => c.value > 0)} />
        <main className="container">
          <Counters
            counters={this.state.counters}
            onDelete={this.handleDelete}
            onIncrement={this.handleIncrement}
            onDecrement={this.handleDecrement}
          />
        </main>
      </React.Fragment>
    );
  }
}

export default Counter;
