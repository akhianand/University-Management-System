import React, { Component } from "react";
import axios from "axios";
import { getURL } from "./../../config/Config";
import Auth from "./Auth";
import { Link } from "react-router-dom";
import Header from '../Header/Header';
import SidePane from '../SidePane/SidePane'

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstname: "",
      lastname: "",
      department: "",
      email: "",
      addressline1: "",
      addressline2: "",
      city: "",
      role: "",
      state: "",
      zip: 0,
      hasError: "",
      user: null,
      errorMessage: "An Error has Occoured",
      success: false,
      successMessage: "",
      updated: false
    };

    this.submitUpdate = this.submitUpdate.bind(this);
    this.firstnameChangeHandler = this.firstnameChangeHandler.bind(this);
    this.lastnameChangeHandler = this.lastnameChangeHandler.bind(this);
    this.departmentChangeHandler = this.departmentChangeHandler.bind(this);
    this.addressline1ChangeHandler = this.addressline1ChangeHandler.bind(this);
    this.addressline2ChangeHandler = this.addressline2ChangeHandler.bind(this);
    this.cityChangeHandler = this.cityChangeHandler.bind(this);
    this.stateChangeHandler = this.stateChangeHandler.bind(this);
    this.zipChangeHandler = this.zipChangeHandler.bind(this);
  }

  submitUpdate = e => {
    e.preventDefault();

    //Validation
    const update = {
      firstname: this.state.firstname,
      lastname: this.state.lastname,
      department: this.state.department,
      email: localStorage.getItem("email"),
      role: localStorage.getItem("role"),
      address: {
        addressline1: this.state.addressline1,
        addressline2: this.state.addressline2,
        city: this.state.city,
        state: this.state.state,
        zip: this.state.zip
      }
    };

    let url = getURL(`/profile?UserID=${localStorage.getItem("userid")}`);
    axios
      .put(url, update)
      .then(response => {
        console.log(response);
        if (response.status === 200) {
          this.setState({
            updated: true,
            success: true,
            successMessage: "Profile has been Updated successfully"
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
  };

  componentDidMount() {
    let url = getURL(`/profile?UserID=${localStorage.getItem("userid")}`);
    console.log(url);
    axios
      .get(url)
      .then(response => {
        console.log(response);
        if (response.status === 200) {
          let user = response.data;
          console.log(user);
          this.setState({
            firstname: user.Firstname,
            lastname: user.Lastname,
            department: user.Department,
            email: localStorage.getItem("email"),
            addressline1: user.Address.AddressLine1,
            addressline2: user.Address.AddressLine2,
            city: user.Address.City,
            state: user.Address.State,
            zip: user.Address.Zip,
            role: user.Role
          });
        }
      })
      .catch(err => {});
  }

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
  addressline1ChangeHandler = e => {
    this.setState({
      addressline1: e.target.value
    });
  };

  addressline2ChangeHandler = e => {
    this.setState({
      addressline2: e.target.value
    });
  };

  cityChangeHandler = e => {
    this.setState({
      city: e.target.value
    });
  };
  stateChangeHandler = e => {
    this.setState({
      state: e.target.value
    });
  };
  zipChangeHandler = e => {
    this.setState({
      zip: e.target.value
    });
  };

  render() {
    // let redirect = null;
	// redirect = this.state.userSignedUp ? <Redirect to="/login" /> : null;
	var style ={
		height: '100vh'
	}
    return (
      <>
   
        <div className="home-parent-container">
          <Header />
          <div className="bg-grey" style={style}>
            <div className="row mt-5 container">
              <SidePane active="Profile" />
              <div className="main-container col-8 ">
                <div className="container py-5">
                  {this.state.success ? (
                    <div className="row text-center">
                      <div className="col-md-6 mx-auto">
                        <div className="alert alert-success" role="alert">
                          {this.state.successMessage}
                        </div>
                      </div>
                    </div>
                  ) : null}
                  <div className="row">
                    <div className="col-md-12">
                      <div className="row">
                        <div className="col-12 mx-auto">
                          <div className="card border-secondary">
                            <div className="card-body">
                              <form className="form" role="form">
                                <div className="form-group">
                                  <label htmlFor="firstname">First Name</label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    id="firstname"
                                    placeholder="First Name"
                                    required={true}
                                    value={this.state.firstname}
                                    onChange={this.firstnameChangeHandler}
                                  />
                                </div>
                                <div className="form-group">
                                  <label htmlFor="lastname">Last Name</label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    id="lastname"
                                    placeholder="Last Name"
                                    required={true}
                                    value={this.state.lastname}
                                    onChange={this.lastnameChangeHandler}
                                  />
                                </div>
                                <div className="form-group">
                                  <label htmlFor="email">Email</label>
                                  <input
                                    type="email"
                                    className="form-control"
                                    id="email"
                                    value={this.state.email}
                                    required={true}
                                    disabled
                                  />
                                </div>
                                <div className="form-group">
                                  <label htmlFor="department">Department</label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    id="department"
                                    placeholder="Department"
                                    required={true}
                                    value={this.state.department}
                                    onChange={this.departmentChangeHandler}
                                  />
                                </div>

                                <div className="form-group">
                                  <label htmlFor="addressline1">
                                    Address Line 1
                                  </label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    id="addressline1"
                                    placeholder="1600 Pennsylvania Ave"
                                    required={true}
                                    value={this.state.addressline1}
                                    onChange={this.addressline1ChangeHandler}
                                  />
                                </div>

                                <div className="form-group">
                                  <label htmlFor="addressline2">
                                    Address Line 2
                                  </label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    id="addressline2"
                                    placeholder="#1"
                                    required={true}
                                    value={this.state.addressline2}
                                    onChange={this.addressline2ChangeHandler}
                                  />
                                </div>

                                <div className="form-group">
                                  <label htmlFor="city">City</label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    id="city"
                                    placeholder="Washington"
                                    required={true}
                                    value={this.state.city}
                                    onChange={this.cityChangeHandler}
                                  />
                                </div>

                                <div className="form-group">
                                  <label htmlFor="state">State</label>
                                  <input
                                    type="text"
                                    className="form-control"
                                    id="state"
                                    placeholder="DC"
                                    required={true}
                                    value={this.state.state}
                                    onChange={this.stateChangeHandler}
                                  />
                                </div>
                                <div className="form-group">
                                  <label htmlFor="zip">Zip</label>
                                  <input
                                    type="number"
                                    className="form-control"
                                    id="zip"
                                    value={this.state.zip}
                                    placeholder="20500"
                                    required={true}
                                    onChange={this.zipChangeHandler}
                                  />
                                </div>

                                <br />
                                <div className="form-group">
                                  <button
                                    onClick={this.submitUpdate}
                                    className="btn btn-primary btn-lg btn-block"
                                  >
                                    Update
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
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Profile;
