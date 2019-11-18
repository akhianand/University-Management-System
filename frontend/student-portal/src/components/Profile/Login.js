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

        <div className="container py-5">
          <div className="row text-center">
            <div className="col-md-6 mx-auto">
              <h1 style={{ fontWeight: "lighter" }}>Login</h1>
            </div>
          </div>
          <br />
        
		{ this.state.hasError ?  <div className="row text-center">
            <div className="col-md-6 mx-auto">
              <div className="alert alert-danger" role="alert">
                {this.state.errorMessage}
              </div>
            </div>
	</div> : null}

          <div className="row">
            <div className="col-md-12">
              <div className="row">
                <div className="col-md-6 mx-auto">
                  <div className="card border-secondary">
                    <div className="card-body">
                      <form className="form" role="form" >
                        <div className="form-group">
                          <label htmlFor="email">Email</label>
                          <input
                            type="email"
                            className="form-control"
                            id="email"
                            placeholder="john.doe@sjsu.edu"
                            required={true}
                            onChange={this.emailChangeHandler}
                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor="password">Password</label>
                          <input
                            type="password"
                            className="form-control"
                            id="password"
                            placeholder="Password"
                            required={true}
                            onChange={this.passwordChangeHandler}
                          />
                        </div>
                        <br />
                        <div className="form-group">
                          <button
                            onClick={this.submitLogin}
                            className="btn btn-primary btn-lg btn-block"
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
