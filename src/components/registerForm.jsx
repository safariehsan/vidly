import React from "react";
import Form from "./common/form";
import Joi from "joi-browser";

class RegisterForm extends Form {
  state = {
    data: { username: "", password: "", name: "" },
    errors: { },
  };
  schema = {
    username: Joi.string().email().required().label("Username"),
    password: Joi.string().min(5).required().label("Password"),
    name: Joi.string().required().label("Name"),
  };

  doSubmit = () => {
    // call the server
    console.log("Submitted");
  };

  render() {
    return (
      <div className="row">
        <div className="col-sm-3"></div>
        <div className="col-sm-6">
          <h1>Register Form</h1>
          <form onSubmit={this.handleSubmit}>
            {this.renderInput("username", "User-name", "text", true)}
            {this.renderInput("password", "Pass-word", "password")}
            {this.renderInput("name", "Name", "name")}
            {this.renderButton("Register", "primary", "md")}
          </form>
        </div>
        <div className="col-sm-3"></div>
      </div>
    );
  }
}

export default RegisterForm;
