import React from "react";
import Form from "./common/form";
import Joi from "joi-browser";
import { toast } from "react-toastify";

class LoginForm extends Form {
  state = {
    data: { username: "", password: "" },
    errors: {
      // username: 'Username is required',
      // password: 'Password is wrong'
    },
  };
  schema = {
    username: Joi.string().required().label("Username"),
    password: Joi.string().required().label("Password"),
  };

  doSubmit = () => {
    // call the server
    toast.success("Login Successful");
  };

  render() {
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
