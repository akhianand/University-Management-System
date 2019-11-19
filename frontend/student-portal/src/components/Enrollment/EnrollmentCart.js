import React, {Component} from 'react';
import Header from '../Header/Header';
import axios from 'axios';
import {enrollmentServiceURL} from '../../config/Config';

class EnrollmentCart extends Component {

  constructor(props) {
    super(props);

    this.state = {
      cartItems : [],
    }

    //bind actions
  }

  componentDidMount() {
    let studentId = this.props.match.params.studentId;
    axios.get(enrollmentServiceURL + '/cart?StudentId=' + studentId)
    .then((res) => {      
      this.setState({
        cartItems : res.data
      });
      console.log('Result of cart Items: ', this.state.cartItems);
    });

}


    render() {

      let cartItems = this.state.cartItems.map(function(course, index){
        return (
          <tr className="text-align-center">      

                <td>{index+1}</td>
                <td>{course.CourseId}</td>
                <td>{course.CourseName}</td>
                <td>{course.DepartmentName}</td>
                <td>{course.Term}</td>
                <td><button type="button" class="btn btn-success">Enroll</button></td>
          </tr>
        )
      });
      return (
        <div>
          <Header />
          <div className="container mt-5">
            <div className="text-align-center mb-5 enrollment-cart-heading">
              <h3>Enrollment Cart</h3>
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
                {cartItems}              
              </tbody>
            </table>
      
          </div>
        </div>
      )
        
    }
}

export default EnrollmentCart;