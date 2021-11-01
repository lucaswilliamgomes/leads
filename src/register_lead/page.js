import React, { Component } from "react";

import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./page.css";

export default class RegisterLeadPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      phone: "",
      email: "",
      opportunities: [],
    };
  }

  handleUserInput = (element) => {
    const name = element.target.name;
    const value = element.target.value;
    this.setState({ [name]: value });
    console.log("name " + this.state.name)
    console.log("phone " + this.state.phone)
    console.log("email " + this.state.email)
    console.log("oportunities " + this.state.opportunities)
  };

  checkboxControllAll (element) {
    var boxes = document.querySelectorAll(".custom-control-input")
    if (element.target.checked) {
      for (const [key, value] of Object.entries(boxes)) {
        value.checked = true;
      }
    } else {
      for (const [key, value] of Object.entries(boxes)) {
        value.checked = false;
      }
    }
  }

  submitForm(event) {
    alert("Tudo certo!");
    event.preventDefault();
  }

  render() {
    return (
      <div>
        <div class="container">
          <form onSubmit={(event) => this.submitForm(event)}>
            <div class="row">
              <div class="col-sm">
                <img
                  class="img_logo"
                  src={process.env.PUBLIC_URL + "/logo.png"}
                  alt="logo"
                />

                <div class="form">
                  <div style={{ marginBottom: 10 }}>
                    <label>Nome*</label>
                    <input
                      required="true"
                      type="text"
                      className="form-control"
                      name="name"
                      onChange={this.handleUserInput}
                    />
                  </div>

                  <div style={{ marginBottom: 10 }}>
                    <label>Telefone*</label>
                    <input
                      required="true"
                      className="form-control"
                      name="phone"
                      onChange={this.handleUserInput}
                    />
                  </div>

                  <div style={{ marginBottom: 10 }}>
                    <label>Email*</label>
                    <input
                      required="true"
                      className="form-control"
                      name="email"
                      onChange={this.handleUserInput}
                    />
                  </div>
                </div>
              </div>
              <div class="col-sm">
                <div class="container">
                  <h3 class="head">Novo Lead</h3>
                  <div class="col-5">
                    <table class="table">
                      <thead>
                        <tr>
                          <th scope="col" class="d-flex justify-content-center">
                            <input
                              type="checkbox"
                              class="checkAll"
                              id="customCheckAll"
                              onChange={this.checkboxControllAll}
                            ></input>
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td class="d-flex justify-content-center">
                            <div class="custom-control custom-checkbox">
                              <input
                                type="checkbox"
                                class="custom-control-input"
                                id="customCheck1"
                              ></input>
                            </div>
                          </td>
                          <td>RPA</td>
                        </tr>
                        <tr>
                          <td class="d-flex justify-content-center">
                            <div class="custom-control custom-checkbox">
                              <input
                                type="checkbox"
                                class="custom-control-input"
                                id="customCheck2"
                              ></input>
                            </div>
                          </td>
                          <td>Produto digital</td>
                        </tr>
                        <tr>
                          <td class="d-flex justify-content-center">
                            <div class="custom-control custom-checkbox">
                              <input
                                type="checkbox"
                                class="custom-control-input"
                                id="customCheck3"
                              ></input>
                            </div>
                          </td>
                          <td>Analytics</td>
                        </tr>
                        <tr>
                          <td class="d-flex justify-content-center">
                            <div class="custom-control custom-checkbox">
                              <input
                                type="checkbox"
                                class="custom-control-input"
                                id="customCheck4"
                              ></input>
                            </div>
                          </td>
                          <td>BPM</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <button type="submit" className="btn btn-primary btn-block">
                    Cadastrar
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
