import React, { Component } from "react";
import auth from "../services/authService";
import Form from "../components/common/form";
import Joi from "joi-browser";

class Profile extends Form {
  state = {
    data: { username: "", password: "", name: "" },
    errors: {},
  };
  schema = {
    username: Joi.string().email().required().label("Username"),
    password: Joi.string().min(5).required().label("Password"),
    name: Joi.string().required().label("Name"),
  };
  async populateProfile() {
    try {
     
    } catch (ex) {
     
    }
  }
  async componentDidMount() {
    await this.populateProfile();
  }
  render() {
    const user = auth.getCurrentUser();
    return (
      <div className="row">
        <div className="col-sm-3"></div>
        <div className="col-sm-6">
          <h1>Profile ({user.name})</h1>
          <form onSubmit={this.handleSubmit}>
            {this.renderInput("username", "Username", "text", true)}
            {this.renderInput("password", "Password", "password")}
            {this.renderInput("name", "Name", "name", user.name)}
            {this.renderButton("Edit", "primary", "md")}
          </form>
        </div>
        <div className="col-sm-3"></div>
      </div>
    );
  }
}

export default Profile;
