import React from "react";
import Form from "./common/form";
import Joi from "joi-browser";
import { toast } from "react-toastify";
import auth from "../services/authService";
import { Redirect } from "react-router-dom";

class LoginForm extends Form {
  state = {
    data: { username: "", password: "" },
    errors: {
      // username: 'Username is required',
      // password: 'Password is wrong'
    },
  };
  schema = {
    username: Joi.string().required().email().label("Username"),
    password: Joi.string().required().label("Password"),
  };

  doSubmit = async () => {
    try {
      const { data } = this.state;
      await auth.login(data.username, data.password);
      const {state} = this.props.location;
      window.location = state ? state.from.pathname : "/";
      toast.success("Login Success");
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.username = ex.response.data;
        this.setState({ errors });
        toast.error("Login Error");
      }
    }
  };

  render() {
    if(auth.getCurrentUser()) return <Redirect to="/profile" />
    return (
      <div className="row">
        <div className="col-sm-3"></div>
        <div className="col-sm-6">
          <h1>Login Form</h1>
          <form onSubmit={this.handleSubmit}>
            {this.renderInput("username", "User-name", "text", true)}
            {this.renderInput("password", "Pass-word", "password")}
            {this.renderButton("Login", "success", "md")}
          </form>
        </div>
        <div className="col-sm-3"></div>
      </div>
    );
  }
}

export default LoginForm;
