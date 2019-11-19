import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import Login from './Profile/Login';
import Signup from './Profile/Signup';
import Profile from './Profile/Profile';
import CoursesSearch from './Course/CoursesSearch';
import Home from './Home/Home';
import CourseDetail from './Course/CourseDetail';

class Main extends Component {
    render() {
        return (
            <div>
                <Route exact path="/" component={Home} />  
                <Route path="/login" component={Login} />  
                <Route path="/signup" component={Signup} />  
                <Route path="/profile" component={Profile} />  
                <Route exact path="/courses" component={CoursesSearch} />
                <Route exact path="/courses/:CourseID" component={CourseDetail} />
            </div>
        )
    }
    
}

export default Main;