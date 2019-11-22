import React, { Component } from "react";
import Header from "../Header/Header";
import axios from "axios";
import { Redirect } from "react-router";

import { API_URL, API_PORT } from "./config.js";
class Announcement extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      isAdmin: false,
      isStudent: false,
      hasError: false,
      errorMessage: ""
    };

    this.submitLogin = this.submitLogin.bind(this);
    this.emailChangeHandler = this.emailChangeHandler.bind(this);
    this.passwordChangeHandler = this.passwordChangeHandler.bind(this);
  }

  submitLogin = e => {
    e.preventDefault();

    const login = {
      email: this.state.email,
      password: this.state.password
    };

    axios
      .post(`${API_URL}:${API_PORT}/login`, login)
      .then(response => {
        console.log(response);
        if (response.status === 200) {
          localStorage.setItem("email", response.data.Email);
          localStorage.setItem("role", response.data.Role);
          localStorage.setItem("userid", response.data.UserID);
          this.setState({
            userLoggedIn: true,
            hasError: false,
            errorMessage: ""
          });
        }
      })
      .catch(err => {
        console.log();
        this.setState({
          userLoggedIn: false,
          hasError: true,
          errorMessage: err.response.data.Message
        });
      });
  };

  emailChangeHandler = e => {
    this.setState({
      email: e.target.value
    });
  };
  passwordChangeHandler = e => {
    this.setState({
      password: e.target.value
    });
  };

  render() {
    let redirect = null;
    redirect = this.state.userLoggedIn ? <Redirect to="/Profile" /> : null;

    return (
      <>
        {/* {redirect} */}
        <Header />
        <div className="container py-5">
          <div className="row text-center">
            <div className="col-md-6 mx-auto">
              <h1 style={{ fontWeight: "lighter" }}>Announcements</h1>
            </div>
          </div>

          <br />

          <div className="row text-center">
            <div className="col-md-6 mx-auto">
              <div class="card">
                <div class="card-header">Date/Time</div>
                <div class="card-body">
                  <p class="card-text">This is a sample Announcement</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Announcement;
