import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import {getURL} from '../../config/Config';

class PaymentContainer extends Component {
    constructor(props) {
        super(props);    
        this.state = {
            feesAmount : 0
        }
        //bind
    }

    componentDidMount() {
        let studentId = 1001;
        axios.get(getURL('/enrollment?StudentId=' + studentId))
        .then((res) => {
            let enrolledCourses = res.data;
            let fees = 0;
                
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
            <div>
                <div className="p-4 mt-5 border payment-container">
                    <p  className="section-headline">Payment</p>
                    <div>
                        <p>You owe ${this.state.feesAmount}</p>
                    </div>
                    <div>
                        <Link to="/payment/1001">Proceed to Payment >>></Link>
                    </div>
                </div>
            </div>
        )
    }
}

export default PaymentContainer;