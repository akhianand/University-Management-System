import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class PaymentContainer extends Component {
    render() {
        return (
            <div>
                <div className="p-4 mt-5 border payment-container">
                    <p  className="section-headline">Payment</p>
                    <div>
                        <p>You owe $5,105.00</p>
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