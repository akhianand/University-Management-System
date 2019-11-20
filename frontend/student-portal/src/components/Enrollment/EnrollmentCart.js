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

handleEnrollment = (index) => {
  let cartItem = this.state.cartItems[index];
  console.log('cartItem to be enrolled ', cartItem);
  //axios.defaults.withCredentials = true;
  axios.post(enrollmentServiceURL + '/enroll', cartItem)
  .then((res)=> {
    console.log('Enrollment completed successfully');
    let updatedCart = this.state.cartItems.splice(index, 1);
    this.setState({
      cartItems : updatedCart
    }); 

    console.log('Updated Cart ', this.state.cartItems);
  })
}


    render() {

      let cartItems = this.state.cartItems.map((course, index) => {
        return (
          <tr className="text-align-center" key={index}>      

                <td>{index+1}</td>
                <td>{course.CourseId}</td>
                <td>{course.CourseName}</td>
                <td>{course.DepartmentName}</td>
                <td>{course.Term}</td>
                <td><button type="button" className="btn btn-success" onClick={() => this.handleEnrollment(index)}>Enroll</button></td>
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