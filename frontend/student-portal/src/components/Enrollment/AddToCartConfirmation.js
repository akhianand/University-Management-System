import React, {Component} from 'react';
import Header from '../Header/Header';

class AddToCartConfirmation extends Component {
    render() {
        return (
            <div>
                <Header/>
                <div className="container">
                    <div className="row mt-5">
                        <div className="col-3">

                        </div>
                        <div className="col-6 confirmation-container text-align-center">
                            <div className=" mt-3">
                                <p>Are you sure, do you want to continue?</p>
                            </div>
                            <div className="mb-3">
                                <button type="button" class="btn btn-info">Yes</button>
                                <button type="button" class="btn btn-info ml-3">No</button>
                            </div>
                        </div>
                    </div>
                </div>
                
            </div>
        )
    }
}

export default AddToCartConfirmation;