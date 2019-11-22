import React, { Component } from 'react';
import Header from '../Header/Header';
import SidePane from '../SidePane/SidePane'
import { getURL } from '../../config/Config';
import axios from 'axios'

class ViewGrades extends Component {
    constructor(props) {
        super(props);
        this.state = {
            grades: [],
            errorMessage : null
        }
        this.gradeRows = this.gradeRows.bind(this);
    }
    gradeRows = ()=> {
        let grades = this.state.grades.map((gradeObj, index)=>
              <tr className="text-align-center" key={index}>      
                    <td>{index+1}</td>
                    <td>{gradeObj.CourseID}</td>
                    <td>{gradeObj.CourseName}</td>
                    <td>{gradeObj.Term}</td>
                    <td>{gradeObj.Grade}</td>
              </tr>
          );
          return grades;
    }
    componentDidMount() {
        const studentID = 430;
        const viewGradesURL = getURL("/grades" + "?StudentID=" + studentID);
        try {
            axios.get(viewGradesURL)
                .then((res) => {

                    this.setState({
                        grades: res.data
                    });
                    console.log('Grades : ', this.state.grades);
                });
        } catch (error) {
            console.log(error);
            console.log("Error in fetching grades!");
            this.setState({
                grades: [],
                errorMessage: "Error in fetching grades!"
            }
            )
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
                                    <h3>Your Transcript</h3>
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
                                        { this.gradeRows() }
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