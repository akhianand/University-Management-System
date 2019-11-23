import React, { Component } from "react";
import LHeader from "./LHeader";
import axios from "axios";
import { Redirect } from "react-router";
import {Link} from 'react-router-dom';

import { getURL } from "../../config/Config";
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
	
    axios
      .post(getURL("/login"), login)
      .then(response => {
		  console.log(response);
        if (response.status === 200) {
			  localStorage.setItem("email", response.data.Email)
			  localStorage.setItem("role", response.data.Role)
			  localStorage.setItem("userid", response.data.UserID)
			  localStorage.setItem("name", `${response.data.Firstname} ${response.data.Lastname}`)
            this.setState({
              userLoggedIn: true,
              hasError: false,
              errorMessage: ""
            })
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
	redirect = this.state.userLoggedIn ?  <Redirect to= "/"/> : null ;

    return (
      <>
	  	{redirect}
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
							<br/>
						  <Link to="/signup">Click Here to Signup</Link>
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
