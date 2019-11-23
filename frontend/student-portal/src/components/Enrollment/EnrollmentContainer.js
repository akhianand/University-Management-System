import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import { getURL } from '../../config/Config';

class EnrollmentContainer extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            enrollmentInfo : [],
            currentStudentId : localStorage.getItem("userid")
        }

        //bind
    }

    componentDidMount() {
        let studentId = localStorage.getItem("userid");
        axios.get(getURL('/enrollment?StudentId=' + studentId))
        .then((res) => {
          
            let enrolledCourses = res.data;        
            
            let enrollmentInfoArray = [];
            for(let course of enrolledCourses) {
                let entry = new Object();
                entry.class = course.DepartmentName + ' ' + course.CourseId;
                entry.courseName = course.CourseName;                        
                enrollmentInfoArray.push(entry);
            }          
            this.setState ({
                enrollmentInfo : enrollmentInfoArray
            });
            console.log('Result of enrollment Info items: ', this.state.enrollmentInfo);
        });
    }

    render() {

        let enrollmentInfo = this.state.enrollmentInfo.map((courseInfo, index) => {
            return (
                <tr key={index}>                                                
                    <td>{courseInfo.class}</td>
                    <td>{courseInfo.courseName}</td>                
                </tr>
            )
            
        });

        return (
            <div>
                <div className="p-4 border courses-container">
                    <p className="section-headline">Courses</p>
                    <div>
                        <table className="table table-bordered text-align-center">
                            <thead>
                                <tr>                                
                                <th scope="col">Class</th>
                                <th scope="col">Course Name</th>                                
                                </tr>
                            </thead>
                            <tbody>
                                {enrollmentInfo}
                            </tbody>
                        </table>
                    </div>
                    <div>
                        <Link to={"/enrollment/" + this.state.currentStudentId}>View Enrollment Information >>></Link>
                    </div>
                    <div>
                        <Link to={"/enrollmentcart/" + this.state.currentStudentId}>View Enrollment Cart >>></Link>
                    </div>
                </div>
            </div>
        )
    }
}

export default EnrollmentContainer;