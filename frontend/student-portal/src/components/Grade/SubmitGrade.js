import React, { Component } from 'react';
import Header from '../Header/Header';
import SidePane from '../SidePane/SidePane'

class SubmitGrade extends Component {
    constructor(props) {
        super(props);
        this.state = {
            enrollments: [],
            errorMessage: null
        }
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
                        <SidePane active="ViewGrades" />
                        <div className="main-container col-8 bg-white p-3">
                            <div className="container mt-5">
                                <div className="text-align-center mb-5 enrollment-cart-heading">
                                    <h3>Enrolled Students</h3>
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
                                        {/* { this.studentGrades() } */}
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