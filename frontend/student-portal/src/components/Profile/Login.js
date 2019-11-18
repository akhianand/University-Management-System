import React, { Component } from "react";
import LHeader from "./LHeader";

class Login extends Component {
  render() {
    return (
      <>
        <LHeader />

        <div class="container py-5">
          <div class="row text-center">
            <div class="col-md-6 mx-auto">
              <h1 style={{fontWeight:"lighter"}}>Login</h1>
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
                          <label for="password">Password</label>
                          <input
                            type="password"
                            class="form-control"
                            id="password"
                            placeholder="Password"
                            required="true"
                          />
                        </div>
                        <br />
                        <div class="form-group">
                          <button
                            type="submit"
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
