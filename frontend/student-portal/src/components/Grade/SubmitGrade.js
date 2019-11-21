import React, { Component } from 'react';
import Header from '../Header/Header';
import SidePane from '../SidePane/SidePane'

class SubmitGrade extends Component {
    constructor(props) {
        super(props);
        this.state = {
            grades: [],
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
                        <SidePane active="SubmitGrades" />
                    </div>
                </div>
            </div>
        );
    }
}

export default SubmitGrade;