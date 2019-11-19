import React, { Component } from 'react';
import Header from '../Header/Header';
import SidePane from '../SidePane/SidePane'
import { getURL } from '../../config/Config';
import axios from 'axios'

class CourseDetail extends Component{
    constructor(props) {
        super(props)
        this.state = {
            CourseID: this.props.match.params.CourseID,
	        CourseName: null,
	        Instructor: null,
	        ClassTime:[],
	        Capacity: null,
	        Credit: null,
	        Term: null,
	        DepartmentName: null,
            Fees: null,
            errorMessage: ""
        }
    }
    
    componentDidMount = async () => {
        
        const url = getURL("/courses/"+ this.state.CourseID);
        try{
            let response = await axios.get(url)
            console.log(response)
            this.setState({
                ...response.data,
                errorMessage: ""
            })
        }catch(error){
            if (!error.response) {
                console.log("Server is down!");
                this.setState({
                        CourseID: this.props.match.params.CourseID,
                        CourseName: null,
                        Instructor: null,
                        ClassTime:[],
                        Capacity: null,
                        Credit: null,
                        Term: null,
                        DepartmentName: null,
                        Fees: null,
                        errorMessage: "Server is down!"}
                    )
            }else if(error.response.status=== 400 ){
                console.log(error);
                this.setState({
                    CourseID: this.props.match.params.CourseID,
                    CourseName: null,
                    Instructor: null,
                    ClassTime:[],
                    Capacity: null,
                    Credit: null,
                    Term: null,
                    DepartmentName: null,
                    Fees: null,
                    errorMessage: error.response.data.Message})
            }else {
                this.setState({
                    CourseID: this.props.match.params.CourseID,
                    CourseName: null,
                    Instructor: null,
                    ClassTime:[],
                    Capacity: null,
                    Credit: null,
                    Term: null,
                    DepartmentName: null,
                    Fees: null,
                    errorMessage: "Something went wrong, try again later"}
                )
            }
        }
      }
    
    getTiming = () => {
        return (this.state.ClassTime.map((result, index) =>
            <tr>
                <td>
                    {result.Day}
                </td>
                <td>{result.StartHour}:{result.StartMinutes} to {result.EndHour}:{result.EndMinutes}</td>
            </tr>
        ))
    }

    getRedirectionButton =() => {
        if(localStorage.getItem("role") === "Instructor"){
            return (<button className="btn btn-primary">Grade</button>)
        }else{
            return (<button className="btn btn-primary">Add to cart</button>)
        }
    }

    render(){
        let errorMessage = null;
        var style ={
            height: '100vh'
        }
        if (this.state.errorMessage) {
            errorMessage = <div className="alert alert-danger alert-dismissible row m-2" role="alert">
                <div className="col-11">
                    {this.state.errorMessage}
                </div>
                <div><button type="button" className="close" data-dismiss="alert"><span aria-hidden="true">×</span><span className="sr-only">Close</span></button></div>
            </div>
        }
        console.log({state: this.state})
        return (
            <div className="home-parent-container">
                <Header /> 
                <div className="bg-grey" style={style}> 
                    <div className="row mt-5 container">
                        <SidePane/>
                        <div className="main-container col-8 bg-white p-3">
                            {errorMessage}
                            <div className="row"> 
                                <h5 className="col-12 text-center"> {this.state.DepartmentName}-{this.state.CourseID}</h5>
                            </div>
                            <div className="row mx-3">
                                <div className="col-3 text-left"> <strong>Term:</strong></div>
                                <div className="col-4 text-left"> {this.state.Term}</div>
                            </div>
                            <div className="row mx-3">
                                <div className="col-3 text-left"> <strong>Course:</strong></div>
                                <div className="col-4 text-left"> {this.state.CourseName}</div>
                            </div>
                            <div className="row mx-3">
                                <div className="col-3 text-left"> <strong>Instructor:</strong></div>
                                <div className="col-4 text-left"> {this.state.Instructor}</div>
                            </div>
                            <div className="m-3 row">
                            <div className="mr-0 col-3 text-left"> <strong>Capacity: </strong> {this.state.Capacity}</div>
                            <div className="col-3 text-left"> <strong>Seats Enrolled: </strong> {this.state.Capacity}</div>
                            <div className="col-3 text-left"> <strong>Credits: </strong> {this.state.Credit}</div>
                            <div className="col-3 text-left"> <strong>Fees: </strong> {this.state.Fees}</div>
                            </div>
                            <br/>
                            <div className="row mx-3">
                                <div className="col-12"><strong>Schedule</strong></div>
                            </div>
                            
                            <table className="mx-4 mb-4 mt-2 table">
                                <thead>
                                    <tr>
                                    <th scope="col">Day</th>
                                    <th scope="col">Time</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.getTiming()}
                                </tbody>
                            </table>
                            <div className="row m-3">
                                {this.getRedirectionButton()}
                            </div>
                        </div>
                    </div>
                </div>  
            </div>
        );
    }
}

export default CourseDetail;

