import React, { Component } from "react";

import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./page.css";

class ListLeads extends Component {
  render() {
    return;
  }
}

export default class ListLeadPage extends Component {
  render() {
    return (
      <div class="card-body">
        <div class="toolbar">
          <div class="header">
            <img
              src={process.env.PUBLIC_URL + "/logo.png"}
              width="200"
              style={{ marginBottom: 10 }}
              alt="logo"
            />

            <h3 class="title">Painel de leads</h3>
          </div>

          <button class="btn btn-primary" style={{ margin: 20 }}>
            Adicionar lead [+]
          </button>
        </div>
      </div>
    );
  }
}
