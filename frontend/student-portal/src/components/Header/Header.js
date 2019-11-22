import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Auth from '../Profile/Auth';

class Header extends Component {

	signOut() {
		localStorage.clear();
	}


    render() {
        return (
            <div className="header-container">
				<Auth/>
               <div className="header-bar" >
                    <Link to="/"><img className="logo" src={require('../../Static/Images/49893569-student-icon.png')} alt="logo" /></Link>            
                    <Link to="/login" onClick={this.signOut} className="flt-right mt-3 ml-3 mr-5 header-links"> <b>Sign out</b></Link>
                </div>
            </div>
        )
    }
}

export default Header;