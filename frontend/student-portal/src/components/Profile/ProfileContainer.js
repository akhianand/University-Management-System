import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from "axios";
import { API_URL } from "./config.js";

class ProfileContainer extends Component {
	constructor(props) {
		super(props);
		this.state = {

		  addressline1: "",
		  addressline2: "",
		  city: "",
		  state: "",
		  zip: 0,
		};
	
		
	  }

	componentDidMount() {
		let url = `${API_URL}/profile?UserID=${localStorage.getItem("userid")}`;
		console.log(url);
		axios
		  .get(url)
		  .then(response => {
			console.log(response);
			if (response.status === 200) {
			  let user = response.data;
			  console.log(user);
			  this.setState({
				addressline1: user.Address.AddressLine1,
				addressline2: user.Address.AddressLine2,
				city: user.Address.City,
				state: user.Address.State,
				zip: user.Address.Zip
			  });
			}
		  })
		  .catch(err => {});
	  }


    render() {
        return (
            <div>
                 <div className="p-4 mt-5 border profile-container">
                    <p className="section-headline">Personal Information</p>
                    <div>
                        <p>Address <br/>{this.state.addressline1} <br/>{this.state.addressline2} <br/>{this.state.city}<br/>{this.state.state}<br/>{this.state.zip}</p>
                    </div>
                    <div>
                        <Link to="/">Edit Info >>></Link>
                    </div>
                </div> 
            </div>
        )
    }
}

export default ProfileContainer;