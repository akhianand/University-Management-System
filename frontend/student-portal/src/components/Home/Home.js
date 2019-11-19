import React, {Component} from 'react';
import Header from '../Header/Header';
import CoursesContainer from '../Course/CoursesContainer';
import PaymentContainer from '../Payment/PaymentContainer';
import GradeContainer from '../Grade/GradeContainer';
import ProfileContainer from '../Profile/ProfileContainer';
import SidePane from '../SidePane/SidePane'
import EnrollmentContainer from '../Enrollment/EnrollmentContainer';
class Home extends Component {
    render() {
        return (
            <div className="home-parent-container">
                <Header />            
                <div className="row mt-5 container">
                    <SidePane/>
                    <div className="main-container col-9">
                        
                        <div className="p-4">                        
                            <EnrollmentContainer/>
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