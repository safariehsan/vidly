import React, { Component } from "react";
import Joi from "joi-browser";
import Input from "./input";
import Select from "./select";

class Form extends Component {
  state = {
    data: {},
    errors: {},
  };

  validate = () => {
    const options = { abortEarly: false };
    const { error } = Joi.validate(this.state.data, this.schema, options);
    if (!error) return null;
    const errors = {};
    // map array to object
    for (let item of error.details) {
      errors[item.path[0]] = item.message;
    }
    return errors;
  };
  validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
    const schema = { [name]: this.schema[name] };
    const { error } = Joi.validate(obj, schema);
    return error ? error.details[0].message : null;
  };
  handleSubmit = (e) => {
    e.preventDefault();
    const errors = this.validate();
    console.log(errors);
    this.setState({
      errors: errors || {},
    });
    if (errors) return;
    this.doSubmit();
  };
  handleChange = ({ currentTarget: input }) => {
    //const { errors, data } = this.state;
    const errors = { ...this.state.errors };
    const errorMsg = this.validateProperty(input);
    if (errorMsg) errors[input.name] = errorMsg;
    else delete errors[input.name];
    const data = { ...this.state.data };
    data[input.name] = input.value;
    this.setState({ data, errors });
  };
  renderButton = (label, color, size) => {
    return (
      <button
        disabled={this.validate()}
        className={`btn btn-${color} btn-${size}`}
      >
        {label}
      </button>
    );
  };
  renderInput = (field, label, type, focus) => {
    const { data, errors } = this.state;
    return (
      <Input
        value={data[field]}
        onChange={this.handleChange}
        name={field}
        label={label}
        error={errors[field]}
        type={type}
        focus={focus}
      />
    );
  };
  renderSelect = (field, label, options) => {
    const { data, errors } = this.state;
    return (
      <Select
        name={field}
        value={data[field]}
        label={label}
        options={options}
        onChange={this.handleChange}
        error={errors[field]}
      />
    );
  };
}

export default Form;
