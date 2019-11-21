import React, { Component } from 'react';
import Header from '../Header/Header';
import SidePane from '../SidePane/SidePane'

class ViewGrades extends Component {
    constructor(props) {
        super(props);
        this.state = {
            grades: []
        }
    }
    render() {
        var errorMessage = null
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
                                    <h3>Your Grades</h3>
                                </div>
                                <table className="table table-bordered table-striped">
                                    <thead>
                                        <tr className="text-align-center">
                                            <th scope="col">#</th>
                                            <th scope="col">Course ID</th>
                                            <th scope="col">Course Name</th>
                                            <th scope="col">Term</th>
                                            <th scope="col">Grade</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {/* {cartItems} */}
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
export default ViewGrades;