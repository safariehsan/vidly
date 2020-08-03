import React, { Component } from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import Movies from "./components/movies";
import Counter from "./counter";
import Rentals from "./pages/rentals";
import LoginForm from "./components/loginForm";
import RegisterForm from "./components/registerForm";
import Home from "./pages/home";
import NotFound from "./pages/notFound";
import NavBar from "./components/common/navBar";
import MovieForm from "./pages/movieForm";
import { ToastContainer } from "react-toastify";
import logger from './services/logService';
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

logger.init(); // using Sentry.io for capturing Error logs

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <ToastContainer />
        <NavBar />
        <main className="container">
          <Switch>
            <Route path="/movies/:id" component={MovieForm}></Route>
            <Route path="/movies" component={Movies}></Route>
            <Route path="/counter" component={Counter}></Route>
            <Route path="/rentals" component={Rentals}></Route>
            <Route path="/login" component={LoginForm}></Route>
            <Route path="/register" component={RegisterForm}></Route>
            <Route path="/not-found" component={NotFound}></Route>
            <Route path="/" exact component={Home}></Route>
            <Redirect to="/not-found" />
          </Switch>
        </main>
      </React.Fragment>
    );
  }
}

export default App;
