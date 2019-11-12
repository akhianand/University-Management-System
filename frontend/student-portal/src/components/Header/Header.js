import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class Header extends Component {
    render() {
        return (
            <div className="header-container">
               <div className="header-bar" >
                    <Link to="/"><img className="logo" src={require('../../Static/Images/49893569-student-icon.png')} alt="logo" /></Link>            
                    <Link className="flt-right mt-3 ml-3 mr-5 header-links"> <b>Sign out</b></Link>
                </div>
            </div>
        )
    }
}

export default Header;