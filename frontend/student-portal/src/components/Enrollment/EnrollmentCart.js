import React, {Component} from 'react';
import Header from '../Header/Header';
import axios from 'axios';
import {getURL} from '../../config/Config';
import SidePane from '../SidePane/SidePane';
import {Redirect} from 'react-router-dom';
import EnrollmentSidePane from '../SidePane/EnrollmentSidePane';

class EnrollmentCart extends Component {

  constructor(props) {
    super(props);

    this.state = {
      cartItems : [],
      enrollmentCompleted : false,
      redirectToEnrollment : false,
    }

    //bind actions
  }

  componentDidMount() {
    let studentId = this.props.match.params.studentId;
    axios.get(getURL('/cart?StudentId=' + studentId))
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
  axios.post(getURL('/enroll'), cartItem)
  .then((res)=> {
    console.log('Enrollment completed successfully');
    let cart = this.state.cartItems;
    cart.splice(index, 1);
    this.setState({
      cartItems : cart,
      enrollmentCompleted : true,
      redirectToEnrollment : true
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

      let successMessage = null;

      if(this.state.enrollmentCompleted == true) {
        successMessage = <div className="row">
                          <div className="col-3"></div>
                          <div className="alert alert-success alert-dismissible fade show text-align-center col-6"  role="alert">
                            <strong>Course Enrollment Successful!</strong>   
                            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                              <span aria-hidden="true">&times;</span>
                            </button>
                            </div> 
                            
                        </div>
      }

      let redirectToEnrollmentLink = null;
      if(this.state.redirectToEnrollment == true) {
        redirectToEnrollmentLink = <Redirect to={"/enrollment/" + localStorage.getItem("userid")} />
      } 
      return (
        <div>
          <Header />
          
          {redirectToEnrollmentLink}
          <div className="mt-5">
            <div className="row">
              <div className="col-2 mt-5">
                <EnrollmentSidePane active="Enrollment"/>
              </div>
              <div className="col-9">
              <div className="text-align-center mb-4 enrollment-cart-heading">
              <h3>Enrollment Cart</h3>
            </div>
            {successMessage}
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
            
            
          </div>
        
          
        
        </div>
      )
        
    }
}

export default EnrollmentCart;