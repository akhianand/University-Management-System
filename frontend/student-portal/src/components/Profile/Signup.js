import React, { Component } from "react";
import LHeader from "./LHeader";


class Signup extends Component {
  render() {
    return (
		<>
        <LHeader />

      <div class="container py-5">
		   <div class="row text-center">
            <div class="col-md-6 mx-auto">
              <h1 style={{fontWeight:"lighter"}}>SignUp</h1>
            </div>
          </div>
		  <br/>
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
                        />
                      </div>
                      <div class="form-group">
                        <label for="department">Department</label>
                        <select class="form-control" id="department">
                          <option>Student</option>
                          <option>Faculty</option>
                        </select>
                      </div>
                      <div class="form-group">
                        <label for="password">Password</label>
                        <input
                          type="password"
                          class="form-control"
                          id="password"
                          placeholder="Password"
                          required="true"
                        />
                      </div>
                      <div class="form-group">
                        <label for="password">Verify Password</label>
                        <input
                          type="password"
                          class="form-control"
                          id="password"
                          placeholder="Verify Password"
                          required="true"
                        />
                      </div>
					  <br/>
                      <div class="form-group">
                        <button
                          type="submit"
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
