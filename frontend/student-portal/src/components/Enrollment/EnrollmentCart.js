import React, {Component} from 'react';
import Header from '../Header/Header';
import axios from 'axios';

class EnrollmentCart extends Component {

  constructor(props) {
    super(props);

    this.state = {
      
    }

    //bind actions
  }

  componentDidMount() {
    let studentId = this.props.match.params.studentId;
    axios.get('http://localhost:8086/cart?StudentId=' + studentId)
    .then((res) => {
      console.log('Result of cart Items: ', res.data);
    });

}


    render() {
      return (
        <div>
          <Header />
          <div className="container mt-5">
          <table className="table table-bordered table-striped">
            <thead>
              <tr>
                <th scope="col">Class</th>
                <th scope="col">Time</th>
                <th scope="col">Instructor</th>
                <th scope="col">Credits</th>
                <th scope="col">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>      
                <td>CMPE219-01</td>
                <td>Th 6:00PM - 8:45PM</td>
                <td>@A Moolam</td>
                <td>3.0</td>
                <td>Enrolled</td>
              </tr>
              <tr>      
                <td>CMPE219-01</td>
                <td>Th 6:00PM - 8:45PM</td>
                <td>@A Moolam</td>
                <td>3.0</td>
                <td>Enrolled</td>
              </tr>
              <tr>      
                <td>CMPE219-01</td>
                <td>Th 6:00PM - 8:45PM</td>
                <td>@A Moolam</td>
                <td>3.0</td>
                <td>Enrolled</td>
              </tr>
              <tr>      
                <td>CMPE219-01</td>
                <td>Th 6:00PM - 8:45PM</td>
                <td>@A Moolam</td>
                <td>3.0</td>
                <td>Enrolled</td>
              </tr>
              <tr>      
                <td>CMPE219-01</td>
                <td>Th 6:00PM - 8:45PM</td>
                <td>@A Moolam</td>
                <td>3.0</td>
                <td>Enrolled</td>
              </tr>
            </tbody>
          </table>
       
          </div>
           </div>
      )
        
    }
}

export default EnrollmentCart;