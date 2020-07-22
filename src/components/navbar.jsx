import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

// stateless functional component
const NavBar = (props) => {
  console.log('navbar render');
    return (  
        <nav className="navbar navbar-light">
        <a href="#" className="navbar-brand">
          <b>Total values greater than Zero </b>
          <span className="badge badge-pill badge-warning">{props.total.length}</span>
        </a>
      </nav>
    );
}
export default NavBar;

// class component:
/*
class NavBar extends Component {
  render() {
    const length = this.props.total.length;
    return (
      <React.Fragment>
        <nav class="navbar navbar-light">
          <a href="#" className="navbar-brand">
            <b>Total values greater than Zero </b>
            <span className="badge badge-pill badge-warning">{length}</span>
          </a>
        </nav>
      </React.Fragment>
    );
    
  }
}

export default NavBar;
*/
