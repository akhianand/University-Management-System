import React, { Component } from "react";
import Header from "../Header/Header";
import axios from "axios";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";
import SidePane from '../SidePane/SidePane'

import {getURL} from './../../config/Config'
class Announcement extends Component {
  constructor(props) {
    super(props);
    this.state = {
      announcements: [],
      dismissed: false,
      err: false
    };
  }

  getUserObject() {
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
	var style ={
		height: '100vh'
	}
    let announcements = this.state.announcements.map(announcement => {
      return (
        <>
          <div className="row text-center">
            <div className="col-md-12 mx-auto">
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
                          getURL(`/announcement?UserID=${localStorage.getItem(
                            "userid"
                          )}`),
                          { data: x }
                        )
                        .then(response => {
                          console.log(response);
                          if (response.status === 200) {
                            this.getUserObject();
                            this.setState({
                              dismissed: true,
                              err: false
                            });
                          }
                        })
                        .catch(err => {
                          console.log(err);
                          this.setState({
                            dismissed: true,
                            err: true
                          });
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
        <div className="home-parent-container">
          <Header />
          <div className="bg-grey" style={style}>
            <div className="row mt-5 container">
              <SidePane active="Announcements" />
              <div className="main-container col-8 ">
                <div className="container py-5">
                  {this.state.dismissed ? (
                    <div className="row text-center">
                      <div className="col-md-6 mx-auto">
                        <div
                          className={`alert alert-${
                            this.state.err ? "danger" : "success"
                          }`}
                          role="alert"
                        >
                          {this.state.err
                            ? "Dismiss Error"
                            : "Message Dismissed Successfully"}
                        </div>
                      </div>
                    </div>
                  ) : null}
                  <div className="row text-center">
                    <div className="col-md-12 mx-auto">
                      <h1 style={{ fontWeight: "lighter" }}>Announcements</h1>
                    </div>
                  </div>

                  <br />
                  {announcements}
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Announcement;
