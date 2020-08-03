import React, { Component } from "react";

class Counter extends Component {
  state = {
    count: this.props.value,
    imgUrl: "https://picsum.photos/200",
    // tags: ["tag1", "tag2", "tag3"],
  };
  styles = {
    fontSize: "22px",
    fontWeight: "bold",
    padding: "10px 20px",
  };
  constructor(props) {
    super(props);
    //console.log("constructor");
  }
  componentDidUpdate(prevProps, prevState) {
    //console.log("prev props: ", prevProps);
    //console.log("prev state: ", prevState);
  }
  componentWillUnmount() {
    //console.log("counter unmount");
  }
  /*
  renderTags() {
    if (this.state.tags.length === 0) {
      return <div className="alert alert-danger m-2">There are no tags!</div>;
    }
    return (
      <ul>
        {this.state.tags.map((tag) => (
          <li key={tag}>{tag}</li>
        ))}
      </ul>
    );
  }
  */
  render() {
    console.log("counter render");
    return (
      <React.Fragment>
        {this.props.children}
        {this.props.counterId}

        <div className="row">
          <div className="col-sm-4">
            <img src={this.state.imgUrl} className="image rounded m-2" alt="" />
          </div>
          <div className="col-sm-8">
            <div className="col-sm-6">
              <div className="row">
                <div className="col-sm-6">
                  <span style={this.styles} className={this.getBadgeClass()}>
                    {this.formatCount()}
                  </span>
                </div>
                <div className="col-sm-2">
                  <button
                    style={{ fontSize: 16 }}
                    onClick={() => this.props.onIncrement(this.props.counterId)}
                    className="m-2 btn btn-info btn-lg"
                  >
                    <i className="fa fa-plus-square" aria-hidden="true"></i>
                  </button>
                </div>
                <div className="col-sm-2">
                  <button
                    style={{ fontSize: 16 }}
                    onClick={() => this.props.onDecrement(this.props.counterId)}
                    className="m-2 btn btn-warning btn-lg"
                    disabled={this.props.value === 0 ? "disabled" : ""}
                  >
                    <i className="fa fa-minus-square" aria-hidden="true"></i>
                  </button>
                </div>
                <div className="col-sm-2">
                  <button
                    onClick={() => this.props.onDelete(this.props.counterId)}
                    className="btn btn-danger btn-md btn-md m-2"
                  >
                    <i className="fa fa-trash" aria-hidden="true"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <hr />
      </React.Fragment>
    );
  }
  getBadgeClass() {
    let classes = "badge m-2 badge-";
    let val = this.props.value;
    classes += val === 0 ? "warning" : val > 0 ? "primary" : "danger";
    return classes;
  }

  formatCount() {
    const { value } = this.props;
    return value === 0 ? "ZERO" : value;
  }
}

export default Counter;
