import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class LHeader extends Component {
    render() {
        return (
            <div className="header-container">
               <div className="header-bar" >
                    <Link to="/"><img className="logo" src={require('../../Static/Images/49893569-student-icon.png')} alt="logo" /></Link>            
                </div>
            </div>
        )
    }
}

export default LHeader;