import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import Login from './Profile/Login';
import Signup from './Profile/Signup';
import Profile from './Profile/Profile';
import CoursesSearch from './Course/CoursesSearch';
import Home from './Home/Home';
import AddToCartConfirmation from './Enrollment/AddToCartConfirmation';
import EnrollmentCart from './Enrollment/EnrollmentCart';
import Enrollment from './Enrollment/Enrollment';

class Main extends Component {
    render() {
        return (
            <div>
                <Route exact path="/" component={Home} />  
                <Route path="/login" component={Login} />  
                <Route path="/signup" component={Signup} />  
                <Route path="/profile" component={Profile} />  
                <Route path="/courses" component={CoursesSearch} />
                <Route path="/addToCartConfirmation" component={AddToCartConfirmation} />
                <Route path="/enrollmentCart/:studentId" component={EnrollmentCart} />
                <Route path="/enrollment" component={Enrollment} />
            </div>
        )
    }
    
}

export default Main;