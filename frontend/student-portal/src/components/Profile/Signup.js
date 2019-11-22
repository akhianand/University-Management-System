import React, { Component } from "react";
import LHeader from "./LHeader";
import axios from "axios";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";
import { getURL } from "../../config/Config";

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstname: "",
      lastname: "",
	    role: "student",
      email: "",
      password: "",
      verifypassword: "",
      hasError: "",
      errorMessage: "An Error has Occoured",
      userSignedUp: false
    };

    this.submitSignup = this.submitSignup.bind(this);
    this.emailChangeHandler = this.emailChangeHandler.bind(this);
    this.passwordChangeHandler = this.passwordChangeHandler.bind(this);
    this.firstnameChangeHandler = this.firstnameChangeHandler.bind(this);
	  this.lastnameChangeHandler = this.lastnameChangeHandler.bind(this);
	  this.roleChangeHandler = this.roleChangeHandler.bind(this);
    this.verifyPasswordChangeHandler = this.verifyPasswordChangeHandler.bind(this);
  }

  submitSignup = e => {
	e.preventDefault();
	
	//Validation
    const signup = {
      firstname: this.state.firstname,
      lastname: this.state.lastname,
      email: this.state.email,
      password: this.state.password,
      role: this.state.role
	};
	
	if(signup.password != this.state.verifypassword){
		this.setState({
			hasError: true,
			errorMessage: "Please ensure Passwords Match!"
		  });
	}else {

    axios
      .post(getURL(`/signup`), signup)
      .then(response => {
		  console.log(response);
        if (response.status === 200) {
            this.setState({
			  userSignedUp: true,
              hasError: false,
              errorMessage: ""
            });
        }
      })
      .catch(err => {
		console.log();
        this.setState({
          hasError: true,
          errorMessage: err.response.data.Message
        });
	  });
	}
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
  roleChangeHandler = e => {
    this.setState({
      role: e.target.value
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
	let redirect = null;
	redirect = this.state.userSignedUp ?  <Redirect to= "/login"/> : null ;
    return (
      <>
	      {redirect}
        <LHeader />

        <div className="container py-5">
          <div className="row text-center">
            <div className="col-md-6 mx-auto">
              <h1 style={{ fontWeight: "lighter" }}>SignUp</h1>
            </div>
          </div>
          <br />
          {this.state.hasError ? (
            <div className="row text-center">
              <div className="col-md-6 mx-auto">
                <div className="alert alert-danger" role="alert">
                  {this.state.errorMessage}
                </div>
              </div>
            </div>
          ) : null}
          <div className="row">
            <div className="col-md-12">
              <div className="row">
                <div className="col-md-6 mx-auto">
                  <div className="card border-secondary">
                    <div className="card-body">
                      <form className="form" role="form">
                        <div className="form-group">
                          <label htmlFor="inputName">First Name</label>
                          <input
                            type="text"
                            className="form-control"
                            id="firstname"
                            placeholder="First Name"
                            required={true}
                            onChange={this.firstnameChangeHandler}
                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor="inputName">Last Name</label>
                          <input
                            type="text"
                            className="form-control"
                            id="lastname"
                            placeholder="Last Name"
                            required={true}
                            onChange={this.lastnameChangeHandler}
                          />
                        </div>
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
                          <label htmlFor="role">Role</label>
                          <select
                            onChange={this.roleChangeHandler}
                            className="form-control"
                            id="role"
                          >
                            <option value="Student">Student</option>
                            <option value="Instructor">Instructor</option>
                          </select>
                        </div>
                        <div className="form-group">
                          <label htmlFor="password">Password</label>
                          <input
                            type="password"
                            className="form-control"
                            id="password"
                            placeholder="Password"
                            onChange={this.passwordChangeHandler}
                            required={true}
                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor="vpassword">Verify Password</label>
                          <input
                            type="password"
                            className="form-control"
                            id="vpassword"
                            onChange={this.verifyPasswordChangeHandler}
                            placeholder="Verify Password"
                            required={true}
                          />
                        </div>
                        <br />
                        <div className="form-group">
                          <button
                            onClick={this.submitSignup}
                            className="btn btn-primary btn-lg btn-block"
                          >
                            Register
                          </button>
						  <br/>
						  <Link to="/login">Click Here to Login</Link>
						 
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
