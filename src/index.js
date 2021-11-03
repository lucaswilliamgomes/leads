import ReactDOM from "react-dom";
import React, { Component } from "react";
import Routes from "./router";

class App extends Component {
  render() {
    return (
      <React.StrictMode>
        <Routes />
      </React.StrictMode>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
