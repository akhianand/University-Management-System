import React, {Component} from 'react';
import Header from '../Header/Header';
import axios from 'axios';
import {getURL} from '../../config/Config';
import EnrollmentSidePane from '../SidePane/EnrollmentSidePane';


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
        axios.get(getURL('/enrollment?StudentId=' + studentId))
        .then((res) => {
          
          this.setState ({
              enrolledCourses : res.data
          });
          console.log('Result of enrollment Items: ', this.state.enrolledCourses);
        });
    
    }

    handleDropCouse = (index) => {
        let course = this.state.enrolledCourses[index];

        axios.post(getURL('/drop'), course)
        .then((res) => {
            console.log('Course dropped successfully!');
            let studentId = this.props.match.params.studentId;
            axios.get(getURL('/enrollment?StudentId=' + studentId))
            .then((res) => {
            
            this.setState ({
                enrolledCourses : res.data
            });
            console.log('Result of enrollment Items: ', this.state.enrolledCourses);
            });
        });
    }

    
    render() {

        let enrolledCourses = this.state.enrolledCourses.map((course, index)=>{
            return (
              <tr className="text-align-center" key={index}>      
                    <td>{index+1}</td>
                    <td>{course.CourseId}</td>
                    <td>{course.CourseName}</td>
                    <td>{course.DepartmentName}</td>
                    <td>{course.Term}</td>
                    <td><button type="button" className="btn btn-danger" onClick={()=> this.handleDropCouse(index)}><b>Drop</b></button></td>
              </tr>
            )
          });
                
        

        return (
            <div>
                <Header />
                <div className="mt-5">
                    <div className="row">
                        <div className="col-2 mt-5">
                            <EnrollmentSidePane active="Enrollment"/>
                        </div>
                        <div className="col-9">
                            <div className="text-align-center mb-4 enrollment-heading">
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
                </div>
            </div>
        )
          
      }
}

export default Enrollment;