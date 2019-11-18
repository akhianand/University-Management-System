import React, { Component } from "react";
import LHeader from "./LHeader";

class Login extends Component {
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
	console.log(login);
	
	this.setState({
		hasError: true,
		errorMessage: "Error, Verify Password"
	})
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
    return (
      <>
        <LHeader />

        <div class="container py-5">
          <div class="row text-center">
            <div class="col-md-6 mx-auto">
              <h1 style={{ fontWeight: "lighter" }}>Login</h1>
            </div>
          </div>
          <br />
        
		{ this.state.hasError ?  <div class="row text-center">
            <div class="col-md-6 mx-auto">
              <div class="alert alert-danger" role="alert">
                {this.state.errorMessage}
              </div>
            </div>
	</div> : null}

          <div class="row">
            <div class="col-md-12">
              <div class="row">
                <div class="col-md-6 mx-auto">
                  <div class="card border-secondary">
                    <div class="card-body">
                      <form class="form" role="form" autocomplete="off">
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
                          <label for="password">Password</label>
                          <input
                            type="password"
                            class="form-control"
                            id="password"
                            placeholder="Password"
                            required="true"
                            onChange={this.passwordChangeHandler}
                          />
                        </div>
                        <br />
                        <div class="form-group">
                          <button
                            onClick={this.submitLogin}
                            class="btn btn-primary btn-lg btn-block"
                          >
                            Login
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

export default Login;
