import React, {Component} from 'react';
import Header from '../Header/Header';
import {Link} from 'react-router-dom';

class Signup extends Component {
    render() {
        return (
            <div className="signup-parent-container">
                <Header/>
                <div className="row mt-5 text-align-center">
                    <div className="mt-5 col-4">
                    </div>
                    <div className="mt-5 border col-3 signup-container">
                        <div className="mt-3 mb-3">
                            <Link to="/"><img className="signup-container-logo" src={require('../../Static/Images/49893569-student-icon.png')} alt="logo" /></Link>            
                        </div>
                        <hr/>
                        <div>
                            <div><p><b>Register</b></p></div>
                        </div>
                        <div>
                            <div className="form-group">
                                <input type="text" name="name" id="name" className="form-control form-control-lg" placeholder="Name" />
                            </div>
                            <div className="form-group">
                                <input type="text" name="email" id="email" className="form-control form-control-lg" placeholder="Email" />
                            </div>
                            <div className="form-group">
                                <select class="custom-select form-control-lg">
                                    <option selected>Role</option>
                                    <option value="Student">Student</option>
                                    <option value="Instructor">Instructor</option>                                
                                </select>
                            </div>
                            <div className="form-group">
                                <input type="password" name="password" id="password" className="form-control form-control-lg" placeholder="Password" />
                            </div>
                            <div className="form-group">
                                <button className="btn btn-lg btn-primary">Register</button>
                            </div>
                        </div>
                    </div>
                </div>
                
            </div>
        )
    }
}

export default Signup;