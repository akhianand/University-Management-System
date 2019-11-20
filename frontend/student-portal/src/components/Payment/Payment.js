import React, {Component} from 'react';
import Header from '../Header/Header';
import axios from 'axios';
import { enrollmentServiceURL } from '../../config/Config';

class Payment extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            studentId : "",
            studentName : "",
            departmentName : "",
            feesAmount : 0
        }

        //bind
    }

    componentDidMount() {
        let studentId = this.props.match.params.studentId;

        axios.get(enrollmentServiceURL + '/enrollment?StudentId=' + studentId)
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
                feesAmount : fees
            });
        })
    }
    
    render() {        
        return (
            <div className="">
                <Header/>
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
                                <button type="button" className="btn btn-lg btn-success" ><b>Pay Due Amount</b></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Payment;