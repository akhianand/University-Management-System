import React, {Component} from 'react';
import Header from '../Header/Header';
import axios from 'axios';
import {enrollmentServiceURL} from '../../config/Config';


class Enrollment extends Component {
    
    constructor(props) {
        super(props);

        this.state = {
            enrolledCourses : [],
        }

        // bind actions
    }


    componentDidMount() {
        let studentId = this.props.match.params.studentId;
        axios.get(enrollmentServiceURL + '/enrollment?StudentId=' + studentId)
        .then((res) => {
          
          this.setState ({
              enrolledCourses : res.data
          });
          console.log('Result of enrollment Items: ', this.state.enrolledCourses);
        });
    
    }

    
    render() {

        let enrolledCourses = this.state.enrolledCourses.map(function(course, index){
            return (
              <tr className="text-align-center">      
    
                    <td>{index+1}</td>
                    <td>{course.CourseId}</td>
                    <td>{course.CourseName}</td>
                    <td>{course.DepartmentName}</td>
                    <td>{course.Term}</td>
                    <td><button type="button" class="btn btn-danger">Drop</button></td>
              </tr>
            )
          });

        return (
            <div>
                <Header />
                <div className="container mt-5">
                    <div className="text-align-center mb-5 enrollment-heading">
                        <h3>Enrollment</h3>
                    </div>
                    <table className="table table-bordered table-striped">
                        <thead>
                        <tr className="text-align-center">
                            <th scope="col">#</th>
                            <th scope="col">Course ID</th>
                            <th scope="col">Course Name</th>
                            <th scope="col">Department Name</th>
                            <th scope="col">Term</th>
                            <th scope="col"></th>
                        </tr>
                        </thead>
                        <tbody>
                            {enrolledCourses}              
                        </tbody>
                    </table>
                </div>
            </div>
        )
          
      }
}

export default Enrollment;