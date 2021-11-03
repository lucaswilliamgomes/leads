import { Component } from "react"

export default class HelloUser extends Component {
    render () {
        if (localStorage.getItem("user")) {
            return (
                <p class="d-flex justify-content-center align-items-center">{`Olá ${localStorage.getItem("user")}`}</p>
            )
        } else {
            return "";
        }
    }
}