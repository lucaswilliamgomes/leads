import { Component } from "react";
import logo from '../assets/logo.png'

export default class Logo extends Component {
  render() {
    return (
      <img
        src={logo}
        width="150"
        style={{ marginBottom: 10 }}
        alt="logo"
      />
    );
  }
}
