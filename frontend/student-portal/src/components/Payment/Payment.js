import React, {Component} from 'react';
import Header from '../Header/Header';
import axios from 'axios';
import { getURL } from '../../config/Config';
import {Redirect} from 'react-router-dom';

class Payment extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            studentId : "",
            studentName : "",
            departmentName : "",
            feesAmount : 0,
            enrolledCourses : [],
            redirectToHome : false
        }

        //bind
    }

    componentDidMount() {
        let studentId = this.props.match.params.studentId;

        axios.get(getURL('/enrollment?StudentId=' + studentId))
        .then((res) => {
            let enrolledCourses = res.data;
            let fees = 0;
            if(enrolledCourses.length > 0) {
                let course = enrolledCourses[0];
                this.setState({
                    studentId : course.StudentId,
                    studentName : course.StudentName,
                    departmentName : course.DepartmentName,
                });                
            }
                
            for (let course of enrolledCourses) {
                if(course.HasFeesPaid === false)
                    fees += course.Fees;
            }

            this.setState({
                feesAmount : fees,
                enrolledCourses : enrolledCourses
            });
        })
    }

    processPayment = () => {
        // 
        let courseData = this.state.enrolledCourses;
        for(let i=0;i<courseData.length;i++) {
            /**
             * "studentid" : 430,
                "studentname" : "Rajat Chaurasia",
                "courseid" : 275,
                "term" : "Spring 2020",
                "fees" : 6000.0
             */
            
            let data = {
                "studentid" : courseData[i].StudentId,
                "studentname" : courseData[i].StudentName,
                "courseid" : courseData[i].CourseId,
                "term" : courseData[i].Term,
                "fees" : courseData[i].Fees
            }
            axios.post(getURL('/pay') , data)
                .then((res) => {                    
                    console.log('Payment processing successful');
                    this.setState({
                        redirectToHome : true
                    });
                });
        }
    }
    
    render() {     
        
        let redirectToHomeLink = null;
        if(this.state.redirectToHome == true) {
            redirectToHomeLink = <Redirect to="/" />
        }

        return (
            <div className="">
                <Header/>
                {redirectToHomeLink}
                <div className="container">                    
                    <div className="mt-5">                         
                        <div className="">
                            <div className="text-align-center mb-5 payment-heading">
                                <h3>Payment Details</h3>
                            </div>
                            <table className="table table-bordered table-striped">
                                <thead>
                                    <tr className="text-align-center">
                                        <th scope="col">#</th>
                                        <th scope="col">Student ID</th>
                                        <th scope="col">Student Name</th>
                                        <th scope="col">Department Name</th>
                                        <th scope="col">Due Amount</th>                                        
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="text-align-center" >      
                                        <td>1</td>
                                        <td>{this.state.studentId}</td>
                                        <td>{this.state.studentName}</td>
                                        <td>{this.state.departmentName}</td>
                                        <td>${this.state.feesAmount}</td>
                                    </tr>
                                </tbody>
                            </table>
                            <div className="text-align-center mt-5">
                                <button type="button" className="btn btn-lg btn-success" onClick={()=>this.processPayment()}><b>Pay Due Amount</b></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Payment;