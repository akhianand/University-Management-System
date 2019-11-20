import React, {Component} from 'react';
import Header from '../Header/Header';
import CoursesContainer from '../Course/CoursesContainer';
import PaymentContainer from '../Payment/PaymentContainer';
import GradeContainer from '../Grade/GradeContainer';
import ProfileContainer from '../Profile/ProfileContainer';
import SidePane from '../SidePane/SidePane'
class Home extends Component {
    render() {
        return (
            <div className="home-parent-container">
                <Header />            
                <div className="row mt-5 container">
                    <SidePane active="Student Center"/>
                    <div className="main-container col-9">
                        
                        <div className="p-4">                        
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