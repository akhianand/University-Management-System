import React, { Component } from "react";
import Header from "../Header/Header";
import axios from "axios";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";
import SidePane from "../SidePane/SidePane";

import { getURL } from "../../config/Config";
class MakeAnnouncement extends Component {
  constructor(props) {
    super(props);
    this.state = {
	  message: "",
	  success:false,
	  hasError: false,
	  showMessage:""
    };

    this.submitMessage = this.submitMessage.bind(this);
    this.messageChangeHandler = this.messageChangeHandler.bind(this);
  }

  submitMessage = e => {
	e.preventDefault();
	const message = {
		announcement: this.state.message
		}
	  
	  axios
		.post(getURL("/publish-announcement"), message)
		.then(response => {
			console.log(response);
		  if (response.status === 200) {
				
			  this.setState({
				hasError: false,
				success:true,
				showMessage: "Message Published Successfully"
			  })
		  }
		})
		.catch(err => {
		  console.log();
		  this.setState({
			hasError: true,
			success:false,
			showMessage: "Message Publish Unsucessful"
		  });
		});
	
	
  };

  messageChangeHandler = e => {
    this.setState({
      message: e.target.value
    });
  };

  render() {
    var style = {
      height: "100vh"
    };

    return (
      <>
        <div className="home-parent-container">
          <Header />
          <div className="bg-grey" style={style}>
            <div className="row mt-5 container">
              <SidePane active="MakeAccouncements" />
              <div className="main-container col-8 ">
                <div className="container py-5">
                  <div className="row text-center">
                    <div className="col-md-12 mx-auto">
                      <h1 style={{ fontWeight: "lighter" }}>
                        Make Announcements
                      </h1>
                    </div>
                  </div>

                  <br />
				  {this.state.success ? (
                    <div className="row text-center">
                      <div className="col-md-6 mx-auto">
                        <div className="alert alert-success" role="alert">
                          {this.state.showMessage}
                        </div>
                      </div>
                    </div>
                  ) : null}
				  	  {this.state.hasError ? (
                    <div className="row text-center">
                      <div className="col-md-6 mx-auto">
                        <div className="alert alert-danger" role="alert">
                          {this.state.showMessage}
                        </div>
                      </div>
                    </div>
                  ) : null}

                  <div class="card">
                    <div class="card-header">Announcement</div>
                    <div class="card-body">
                      <h5 class="card-title">Add Announcement</h5>
                      <input
                        type="text"
                        className="form-control"
                        id="message"
                        placeholder="Message"
                        required={true}
                        onChange={this.messageChangeHandler}
                      />
					  <br/><br/>
                      <button onClick={this.submitMessage} class="btn btn-primary">
                        Publish
                      </button>
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

export default MakeAnnouncement;
