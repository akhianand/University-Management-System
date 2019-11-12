import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class ProfileContainer extends Component {
    render() {
        return (
            <div>
                 <div className="p-4 mt-5 border profile-container">
                    <p className="section-headline">Personal Information</p>
                    <div>
                        <p>Address <br/>#322, S 5th Street <br/>San Jose <br/>95112</p>
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