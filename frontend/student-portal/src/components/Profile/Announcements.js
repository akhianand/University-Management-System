import React, { Component } from "react";
import Header from "../Header/Header";
import axios from "axios";
import { Redirect } from "react-router";

import { API_URL, API_PORT } from "./config.js";
class Announcement extends Component {
  constructor(props) {
    super(props);
    this.state = {
      announcements: [],
	  dismissed: false,
	  err:false
	};
	
	
  }

  getUserObject() {
	let url = `${API_URL}:${API_PORT}/profile?UserID=${localStorage.getItem(
		"userid"
	  )}`;
	  console.log(url);
	  axios
		.get(url)
		.then(response => {
		  console.log(response);
		  if (response.status === 200) {
			let user = response.data;
			console.log(user);
			this.setState({
			  announcements: user.Announcements
			});
		  }
		})
		.catch(err => {
		  console.log(err);
		});
  }


  componentDidMount() {
    this.getUserObject();
  }

  render() {
    let announcements = this.state.announcements.map(announcement => {
      return (
        <>
          <div className="row text-center">
            <div className="col-md-6 mx-auto">
              <div class="card">
                <div class="card-header">Announcement</div>
                <div class="card-body">
                  <p class="card-text">{announcement.Announcement}</p>
                  <button
                    onClick={() => {
                      let x = {
                        announcement: announcement.Announcement
                      };
                      axios
                        .delete(
                          `${API_URL}:${API_PORT}/announcement?UserID=${localStorage.getItem(
                            "userid"
                          )}`,
                          {data : x}
                        )
                        .then(response => {
                          console.log(response);
                          if (response.status === 200) {
							this.getUserObject();
                           this.setState({
							   dismissed:true,
							   err:false
						   })
                          }
                        })
                        .catch(err => {
						  console.log(err);
						  this.setState({
							dismissed:true,
							err:true
						})
                        });
                    }}
                    class="btn btn-primary"
                  >
                    Dismiss
                  </button>
                </div>
              </div>
            </div>
          </div>
          <br />
        </>
      );
    });

    return (
      <>
        <Header />
        <div className="container py-5">
		{this.state.dismissed ? (
            <div className="row text-center">
              <div className="col-md-6 mx-auto">
                <div className={`alert alert-${this.state.err? "danger": "success"}` } role="alert">
				{this.state.err? "Dismiss Error": "Message Dismissed Successfully"}
                </div>
              </div>
            </div>
          ) : null}
          <div className="row text-center">
            <div className="col-md-6 mx-auto">
              <h1 style={{ fontWeight: "lighter" }}>Announcements</h1>
            </div>
          </div>

          <br />
          {announcements}
        </div>
      </>
    );
  }
}

export default Announcement;
