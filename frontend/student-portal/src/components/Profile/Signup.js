import React, { Component } from "react";
import LHeader from "./LHeader";
import axios from "axios";
import { API_URL, API_URL } from "./config.js";

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstname: "",
      lastname: "",
      department: "student",
      email: "",
      password: "",
      verifypassword: "",
      hasError: "",
      errorMessage: "",
      userLoggedIn: ""
    };

    this.submitSignup = this.submitSignup.bind(this);
    this.emailChangeHandler = this.emailChangeHandler.bind(this);
    this.passwordChangeHandler = this.passwordChangeHandler.bind(this);
    this.departmentChangeHandler = this.departmentChangeHandler.bind(this);
    this.firstnameChangeHandler = this.firstnameChangeHandler.bind(this);
    this.lastnameChangeHandler = this.lastnameChangeHandler.bind(this);
    this.verifyPasswordChangeHandler = this.verifyPasswordChangeHandler.bind(
      this
    );
  }

  submitSignup = e => {
    e.preventDefault();
    const signup = {
      firstname: this.state.firstname,
      lastname: this.state.lastname,
      email: this.state.email,
      password: this.state.password,
      department: this.state.department
    };
    console.log(signup);

    // axios.defaults.withCredentials = true;
    // axios
    //   .post(`${API_URL}:${API_PORT}/signup`, signup)
    //   .then(response => {
    //     if (response.status === 200) {
    //       if (response.data.success) {
    //         this.setState({
    //           userLoggedIn: true,
    //           hasError: false,
    //           userErrorMessage: ""
    //         });
    //       } else {
    //         this.setState({
    //           userLoggedIn: false,
    //           hasError: true,
    //           userErrorMessage: response.data.error
    //         });
    //       }
    //     } else {
    //       this.setState({
    //         userLoggedIn: false,
    //         hasError: true,
    //         userErrorMessage: response.data.err
    //       });
    //     }
    //   })
    //   .catch(err => {
    //     this.setState({
    //       userLoggedIn: false,
    //       hasError: true,
    //       userErrorMessage: "An Error Has Occoured!"
    //     });
    //   });
  };

  firstnameChangeHandler = e => {
    this.setState({
      firstname: e.target.value
    });
  };
  lastnameChangeHandler = e => {
    this.setState({
      lastname: e.target.value
    });
  };
  departmentChangeHandler = e => {
    this.setState({
      department: e.target.value
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

  verifyPasswordChangeHandler = e => {
    this.setState({
      verifypassword: e.target.value
    });
  };

  render() {
    return (
      <>
        <LHeader />

        <div class="container py-5">
          <div class="row text-center">
            <div class="col-md-6 mx-auto">
              <h1 style={{ fontWeight: "lighter" }}>SignUp</h1>
            </div>
          </div>
          <br />
          {this.state.hasError ? (
            <div class="row text-center">
              <div class="col-md-6 mx-auto">
                <div class="alert alert-danger" role="alert">
                  {this.state.errorMessage}
                </div>
              </div>
            </div>
          ) : null}
          <div class="row">
            <div class="col-md-12">
              <div class="row">
                <div class="col-md-6 mx-auto">
                  <div class="card border-secondary">
                    <div class="card-body">
                      <form class="form" role="form" autocomplete="off">
                        <div class="form-group">
                          <label for="inputName">First Name</label>
                          <input
                            type="text"
                            class="form-control"
                            id="firstname"
                            placeholder="First Name"
                            required="true"
                            onChange={this.firstnameChangeHandler}
                          />
                        </div>
                        <div class="form-group">
                          <label for="inputName">Last Name</label>
                          <input
                            type="text"
                            class="form-control"
                            id="lastname"
                            placeholder="Last Name"
                            required="true"
                            onChange={this.lastnameChangeHandler}
                          />
                        </div>
                        <div class="form-group">
                          <label for="email">Email</label>
                          <input
                            type="email"
                            class="form-control"
                            id="email"
                            placeholder="john.doe@sjsu.edu"
                            required="true"
                            onChange={this.emailChangeHandler}
                          />
                        </div>
                        <div class="form-group">
                          <label for="department">Department</label>
                          <select
                            onChange={this.departmentChangeHandler}
                            class="form-control"
                            id="department"
                          >
                            <option value="student">Student</option>
                            <option value="faculty">Faculty</option>
                          </select>
                        </div>
                        <div class="form-group">
                          <label for="password">Password</label>
                          <input
                            type="password"
                            class="form-control"
                            id="password"
                            placeholder="Password"
                            onChange={this.passwordChangeHandler}
                            required="true"
                          />
                        </div>
                        <div class="form-group">
                          <label for="password">Verify Password</label>
                          <input
                            type="password"
                            class="form-control"
                            id="password"
                            onChange={this.verifyPasswordChangeHandler}
                            placeholder="Verify Password"
                            required="true"
                          />
                        </div>
                        <br />
                        <div class="form-group">
                          <button
                            onClick={this.submitSignup}
                            class="btn btn-primary btn-lg btn-block"
                          >
                            Register
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Signup;
