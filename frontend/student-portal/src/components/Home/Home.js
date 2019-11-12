import React, {Component} from 'react';
import Header from '../Header/Header';
import CoursesContainer from '../Course/CoursesContainer';
import PaymentContainer from '../Payment/PaymentContainer';
import GradeContainer from '../Grade/GradeContainer';
import ProfileContainer from '../Profile/ProfileContainer';

class Home extends Component {
    render() {
        return (
            <div>
                <Header />            
                <div className="row mt-5 container">

                    
                    <div className="side-pane col-3">
                        <div className="p-2">
                            <div className="list-group">
                                <a href="#" className="list-group-item list-group-item-action active">Student Center</a>
                                <a href="#" className="list-group-item list-group-item-action">Courses</a>
                                <a href="#" className="list-group-item list-group-item-action">Enrollment</a>
                                <a href="#" className="list-group-item list-group-item-action">Fee Payment</a>
                                <a href="#" className="list-group-item list-group-item-action">Profile</a>
                                <a href="#" className="list-group-item list-group-item-action">Admin Dashboard</a>
                            </div>
                        </div>
                    </div>
                    <div className="main-container col-9">
                        
                        <div className="p-4 border">                        
                            <CoursesContainer/>
                            <PaymentContainer/>                            
                            <GradeContainer/>
                            <ProfileContainer/>                         
                        </div>
                    </div>                   
                </div>
            </div>
        )
    }
}

export default Home;