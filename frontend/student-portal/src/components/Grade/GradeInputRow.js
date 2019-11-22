import React, { Component } from 'react';

class GradeInputRow extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isGradeSubmitted: false,
            errorMessage: null
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleSubmit = () => {
          console.log('Handle Submit Method');
        }

    handleChange = () => {
        console.log('Handle Change Method');
        }    
    render() {
        return (
            
                <tr className="text-align-center" key={this.props.index}>
                    {/* <form onSubmit={this.handleSubmit}> */}
                        <td>{this.props.index + 1}</td>
                        <td>{this.props.enrollmentObj.StudentId}</td>
                        <td>{this.props.enrollmentObj.StudentName}</td>
                        <td><input type="text" readOnly={this.state.isGradeSubmitted} onChange={this.handleChange}/></td>
                        <td>{!this.state.isGradeSubmitted ? <button type="button" className="btn btn-success" onClick={this.handleSubmit}>SubmitGrade</button>:null}</td>
                    {/* </form> */}
                </tr>
        )

    }
}

export default GradeInputRow;