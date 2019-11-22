import React, { Component } from 'react';

class GradeInputRow extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isGradeSubmitted: false,
            errorMessage: null,
            Grade:""
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleSubmit = (event) => {
        console.log('Handle Submit Method');
        console.log(this.state.Grade);
        if(this.state.Grade==""){
            alert('Please select a Valid Grade');
        }
        if(window.confirm('Are you sure you want to submit?')){
            console.log('sure')
        }
    }

    handleChange = (event) => {
        this.setState(
            { Grade: event.target.value }
        );
    }
    render() {
        return (

            <tr className="text-align-center" key={this.props.index}>
                {/* <form onSubmit={this.handleSubmit}> */}
                <td>{this.props.index + 1}</td>
                <td>{this.props.enrollmentObj.StudentId}</td>
                <td>{this.props.enrollmentObj.StudentName}</td>
                {/* <td><input pattern="[A-F]*" type="text" readOnly={this.state.isGradeSubmitted} onChange={this.handleChange} value={this.state.Grade} /></td> */}
                <td><select disabled={this.state.isGradeSubmitted?"disabled":""} id="inputState" className="col-9" name="Term" value={this.state.Grade} onChange={this.handleChange} required>
                    <option  hidden="" value="" selected>Select Grade...</option>
                    <option value="A">A</option>
                    <option value="B">B</option>
                    <option value="C">C</option>
                    <option value="D">D</option>
                    <option value="F">F</option>
                </select></td>
                <td>{!this.state.isGradeSubmitted ? <button type="button" className="btn btn-success" onClick={this.handleSubmit}>SubmitGrade</button> : null}</td>
                {/* </form> */}
            </tr>
        )

    }
}

export default GradeInputRow;