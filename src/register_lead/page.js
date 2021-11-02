import React, { Component } from "react";
import { FormErrors } from "../utils/form_erros";

import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./page.css";

export default class RegisterLeadPage extends Component {
  lead_model = {
    name: "",
    phone: "",
    email: "",
    opportunities: [],
    status: "Cliente em potêncial",
  };

  constructor(props) {
    super(props);
    this.state = {
      name: "",
      phone: "",
      email: "",
      opportunities: new Set(),
      formErrors: {
        opportunities: "",
      },
      opportunitiesValid: false,
    };
  }

  handleUserInput = (element) => {
    const name = element.target.name;
    const value = element.target.value;
    this.setState({ [name]: value });
  };

  validateForm = () => {
    if (this.state.opportunities.size) {
      this.setState({
        opportunitiesValid: true,
        formErrors: { opportunities: "" },
      });
      return true;
    } else {
      this.setState({
        opportunitiesValid: false,
        formErrors: {
          opportunities: "Você deve selecionar ao menos uma opção!",
        },
      });
      return false;
    }
  };

  checkboxController = (element) => {
    var op = this.state.opportunities;
    if (element.checked) {
      op.add(element.id);
    } else {
      op.has(element.id) ? op.delete(element.id) : void 0;
    }
    this.setState({ opportunities: op });
    this.validateForm();
  };

  checkboxControllerAll = (element) => {
    var boxes = document.querySelectorAll(".custom-control-input");
    for (const value of Object.values(boxes)) {
      value.checked = element.target.checked ? true : false;
      this.checkboxController(value);
    }
  };

  submitForm(event) {
    if (this.validateForm()) {
      var leads = JSON.parse(localStorage.getItem("leads") || "[]");
    
      this.lead_model["name"] = this.state.name
      this.lead_model["phone"] = this.state.phone
      this.lead_model["email"] = this.state.email
      this.lead_model["opportunities"] = Array.from(this.state.opportunities)


      leads.push(this.lead_model);
      console.log(leads)
      localStorage.setItem("leads", JSON.stringify(leads));
      alert("Tudo certo!");
    }
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

                  <div class="form-group" style={{ marginBottom: 10 }}>
                    <label>Telefone*</label>
                    <input
                      required="true"
                      className="form-control"
                      name="phone"
                      type="number"
                      onChange={this.handleUserInput}
                    />
                  </div>

                  <div style={{ marginBottom: 10 }}>
                    <label>Email*</label>
                    <input
                      required="true"
                      className="form-control"
                      name="email"
                      type="email"
                      onChange={this.handleUserInput}
                    />
                  </div>
                </div>
              </div>
              <div class="col-sm">
                <div class="container">
                  <h3 class="head">Novo Lead</h3>
                  <div class="col-5">
                    <table class="table table-bordered">
                      <thead>
                        <h6>Oportunidades*</h6>
                        <tr>
                          <th scope="col" class="d-flex justify-content-center">
                            <input
                              type="checkbox"
                              class="checkAll"
                              id="customCheckAll"
                              onChange={this.checkboxControllerAll}
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
                                id="RPA"
                                name="opportunities"
                                onChange={(element) =>
                                  this.checkboxController(element.target)
                                }
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
                                id="Produto digital"
                                name="opportunities"
                                onChange={(element) =>
                                  this.checkboxController(element.target)
                                }
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
                                id="Analytics"
                                name="opportunities"
                                onChange={(element) =>
                                  this.checkboxController(element.target)
                                }
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
                                id="BPM"
                                name="opportunities"
                                onChange={(element) =>
                                  this.checkboxController(element.target)
                                }
                              ></input>
                            </div>
                          </td>
                          <td>BPM</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div className="panel panel-default">
                    <FormErrors formErrors={this.state.formErrors} />
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
