import React from "react";
import Form from "./common/form";
import Joi from "joi-browser";
import { toast } from "react-toastify";
import * as userService from "../services/userService";
import auth, { loginWithJwt } from '../services/authService';

class RegisterForm extends Form {
  state = {
    data: { username: "", password: "", name: "" },
    errors: {},
  };
  schema = {
    username: Joi.string().email().required().label("Username"),
    password: Joi.string().min(5).required().label("Password"),
    name: Joi.string().required().label("Name"),
  };

  doSubmit = async () => {
    try {
      const response = await userService.register(this.state.data);
      auth.loginWithJwt(response.headers['x-auth-token']);
      //this.props.history.push("/movies");
      window.location = '/movies';
      toast.success("Register Successful");
      
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.username = ex.response.data;
        this.setState({ errors });
        toast.error(`User «${this.state.data.username}» already registered`);
      }
    }
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
