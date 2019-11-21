import React, {Component} from 'react';

class Profile extends Component {
    render() {
        return (
            <div>
				<h1>Welcome {localStorage.getItem("email")}. You are a  {localStorage.getItem("role")}</h1>
            </div>
        )
    }
}

export default Profile;