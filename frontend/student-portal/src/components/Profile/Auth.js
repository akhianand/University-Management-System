import React, { Component } from "react";
import { Redirect } from "react-router";

class Auth extends Component {

  render() {
	let redirect = null;
	let userid =  localStorage.getItem("userid");
	redirect = userid==null ?  <Redirect to= "/login"/> : null ;
    return (
      <>
	  	{redirect}
       </>
    );
  }
}

export default Auth;
