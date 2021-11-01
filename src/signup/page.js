import React, { Component } from "react";
import { FormErrors } from "./form_erros";

import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: "",
      password: "",
      confirmPassword: "",
      formErrors: {
        user: "",
        password: "",
        confirmPassword: "",
      },
      userValid: false,
      passwordValid: false,
      confirmPasswordValid: false,
      formValid: false,
    };
  }

  handleUserInput = (element) => {
    const name = element.target.name;
    const value = element.target.value;
    this.setState({ [name]: value }, () => {
      this.validateField(name, value);
    });
  };

  validateField(fieldName, fieldValue) {
    let fieldValidationErros = this.state.formErrors;
    let userValid = this.state.userValid;
    let passwordValid = this.state.passwordValid;
    let confirmPasswordValid = this.state.confirmPasswordValid;

    if (fieldName === "password") {
      passwordValid = fieldValue.length >= 8;
      fieldValidationErros.password = passwordValid
        ? ""
        : "Senha muito pequena!";

      passwordValid = fieldValue.match(
        "^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.*[! @ # $ % ^ & * ? _ -])(?=.{8,})"
      );
      fieldValidationErros.password = passwordValid
        ? ""
        : "Requisitos de senha não atendidos";
    } else if (fieldName === "confirmPassword") {
      confirmPasswordValid = fieldValue === this.state.password;
      fieldValidationErros.confirmPassword = confirmPasswordValid
        ? ""
        : "As senhas não são iguais!";
    }

    this.setState(
      {
        formErrors: fieldValidationErros,
        userValid: userValid,
        passwordValid: passwordValid,
        confirmPasswordValid: confirmPasswordValid,
      },
      this.validateForm
    );
  }

  validateForm() {
    this.setState({
      formValid:
        this.state.userValid &&
        this.state.passwordValid &&
        this.state.confirmPasswordValid,
    });
  }

  errorClass(error) {
    return error.length === 0 ? "" : "has-error";
  }

  render() {
    return (
      <form>
        <img
          src={process.env.PUBLIC_URL + "/logo.png"}
          width="150"
          style={{ marginBottom: 10 }}
          alt="logo"
        />
        <h3>Cadastro</h3>
        <div
          className={`form-group ${this.errorClass(
            this.state.formErrors.user
          )}`}
          style={{ marginBottom: 10 }}
        >
          <label>Nome de usuário *</label>
          <input
            required="true"
            type="text"
            className="form-control"
            name="user"
            value={this.state.user}
            onChange={this.handleUserInput}
          />
        </div>

        <div
          className={`form-group ${this.errorClass(
            this.state.formErrors.password
          )}`}
          style={{ marginBottom: 10 }}
        >
          <label>Senha*</label>
          <input
            required="true"
            type="password"
            className="form-control"
            name="password"
            value={this.state.password}
            onChange={this.handleUserInput}
          />
        </div>

        <div
          className={`form-group ${this.errorClass(
            this.state.formErrors.confirmPassword
          )}`}
          style={{ marginBottom: 10 }}
        >
          <label>Confirmação de senha *</label>
          <input
            required="true"
            type="password"
            className="form-control"
            name="confirmPassword"
            value={this.state.confirmPassword}
            onChange={this.handleUserInput}
          />
        </div>

        <div className="panel panel-default">
          <FormErrors formErrors={this.state.formErrors} />
        </div>

        <button type="submit" className="btn btn-primary btn-block">
          Cadastrar
        </button>
      </form>
    );
  }
}

export default class App extends Component {
  render() {
    return (
      <div class="d-flex flex-column min-vh-100 justify-content-center align-items-center">
        <SignUp />
      </div>
    );
  }
}

