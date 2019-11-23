import React, { Component } from 'react';
import Header from '../Header/Header';
import SidePane from '../SidePane/SidePane'
import axios from 'axios';
import GradeInputRow from './GradeInputRow.js'
import { getURL } from '../../config/Config';

class SubmitGrade extends Component {
    constructor(props) {
        super(props);
        this.state = {
            enrollments: [],
            errorMessage: null,
            CourseID: null,
            CourseName: null
        }
        if (this.props.location && this.props.location.props && this.props.location.props.CourseID) {
            this.state.CourseID = this.props.location.props.CourseID;
        }
        if (this.props.location && this.props.location.props && this.props.location.props.CourseName) {
            this.state.CourseName = this.props.location.props.CourseName;
        }
        console.log({state: this.state})
    }
    componentDidMount() {
        const getEnrollmentsURL = getURL("/getEnrollmentsByCourse?CourseId="+this.state.CourseID);
        try {
            axios.get(getEnrollmentsURL)
                .then((res) => {
                    console.log(res.data)
                    this.setState({
                        enrollments: res.data
                    });
                    console.log('Enrollment Data : ', this.state.enrollments);
                });
        } catch (error) {
            console.log(error);
            console.log("Error in fetching Enrollment Data!");
            this.setState(
                {
                    grades: [],
                    errorMessage: "Error in fetching Enrollment Data!"
                }
            )
        }
    }

    gradeInputRows = () => {
        let rows = this.state.enrollments.map((enrollObj, index)=>
        <GradeInputRow index={index} enrollmentObj={enrollObj} key={index}></GradeInputRow>
    );
    return rows;
    }
    render() {
        var style = {
            height: '100vh'
        }
        return (
            <div className="home-parent-container">
                <Header />
                <div className="bg-grey" style={style}>
                    <div className="row mt-5 container">
                        <SidePane active="SubmitGrades" />
                        <div className="main-container col-8 bg-white p-3">
                            <div className="container mt-5">
                                <div className="text-align-center mb-5 enrollment-cart-heading">
                                    <h3>Enrolled Students in {this.state.CourseName}</h3>
                                </div>
                                <table className="table table-bordered table-striped">
                                    <thead>
                                        <tr className="text-align-center">
                                            <th scope="col">#</th>
                                            <th scope="col">Student ID</th>
                                            <th scope="col">Student Name</th>
                                            <th scope="col">Grade</th>
                                            <th scope="col"></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.gradeInputRows()}
                                    </tbody>
                                </table>

                            </div>
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}

export default SubmitGrade;