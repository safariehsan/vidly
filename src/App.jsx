import React, { Component } from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import logger from './services/logService';
import Movies from "./components/movies";
import Counter from "./counter";
import Rentals from "./pages/rentals";
import LoginForm from "./components/loginForm";
import Logout from "./components/logout";
import RegisterForm from "./components/registerForm";
import Home from "./pages/home";
import Profile from './pages/profile';
import NotFound from "./pages/notFound";
import NavBar from "./components/common/navBar";
import MovieForm from "./pages/movieForm";
import auth from './services/authService';
import ProtectedRoute from './components/common/protectedRoute';
import "react-toastify/dist/ReactToastify.css";
import "./App.css";


logger.init(); // using Sentry.io for capturing Error logs

class App extends Component {
  state = { 
  }
  componentDidMount() {
   const user = auth.getCurrentUser();
   this.setState({user});
  }
  render() {
    const {user} = this.state;
    return (
      <React.Fragment>
        
        <NavBar user={user} />
        <ToastContainer />
        <main className="container">
          <Switch>
            <ProtectedRoute 
              path="/movies/:id" 
              component={MovieForm} 
            />
            <Route path="/movies" 
              render={props => <Movies {...props} 
              user={this.state.user} />}
            />
            <Route path="/counter" component={Counter}/>
            <Route path="/rentals" component={Rentals}/>
            <Route path="/login" component={LoginForm}/>
            <Route path="/logout" component={Logout}/>
            <Route path="/profile" component={Profile}/>
            <Route path="/register" component={RegisterForm}/>
            <Route path="/not-found" component={NotFound}/>
            <Route path="/" exact component={Home}/>
            <Redirect to="/not-found" />
          </Switch>
        </main>
      </React.Fragment>
    );
  }
}

export default App;
