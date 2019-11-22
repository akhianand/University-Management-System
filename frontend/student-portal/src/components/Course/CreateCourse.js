import React, { Component } from 'react';
import Header from '../Header/Header';
import SidePane from '../SidePane/SidePane'
import { getURL } from '../../config/Config';
import axios from 'axios'

class CreateCourse extends Component{
    constructor(props) {
        super(props)
        this.state = {
	        CourseName: null,
	        Instructor: null,
	        "Day": "",
            "StartHour": "",
            "StartMinutes": "",
            "EndHour": "",
            "EndMinutes": "",
	        Capacity: null,
	        Credit: null,
	        Term: null,
	        DepartmentName: null,
            Fees: null,
            errorMessage: "",
            success: null
        }
        this.timeOptions = this.timeOptions.bind(this)
        this.pad = this.pad.bind(this)
    }

    onSubmitHandler = async (e) => {
        e.preventDefault();
        let url = getURL("/courses")
        try{
            let response = await axios.post(url, {
                CourseName: this.state.CourseName,
                Instructor: this.state.Instructor,
                ClassTime:[{
                    "Day": this.state.Day,
                    "StartHour": parseInt(this.state.StartHour),
                    "StartMinutes": parseInt(this.state.StartMinutes),
                    "EndHour": parseInt(this.state.EndHour),
                    "EndMinutes": parseInt(this.state.EndMinutes),
                }],
                Capacity: parseInt(this.state.Capacity),
                Credit: parseInt(this.state.Credit),
                Term: this.state.Term,
                DepartmentName: this.state.DepartmentName,
                Fees: parseInt(this.state.Fees)
            })
            this.setState({
                            CourseName: null,
                            Instructor: null,
                            "Day": "",
                            "StartHour": "",
                            "StartMinutes": "",
                            "EndHour": "",
                            "EndMinutes": "",
                            Capacity: null,
                            Credit: null,
                            Term: null,
                            DepartmentName: null,
                            Fees: null,
                            errorMessage: "",
                            success: true
                        });
        }catch(error){
            if (!error.response) {
                console.log("Server is down!");
                this.setState({success: false, errorMessage: "Server is down!"})
            }else if(error.response.status === 400 ){
                this.setState({success: false, errorMessage: error.response.data.Message})
            }else {
                this.setState({success: false, errorMessage: "Something went wrong, try again later!"})
            }
        }
    }

    onChange = (e) => {
        let updateState = {}
        updateState[e.target.name] = e.target.value
        if(e.target.name === "DepartmentName"){
            updateState[e.target.name] = e.target.value.toUpperCase()
        }
        this.setState(updateState);
    }

    timeOptions = (num, jump, width=2)=>{
        let timeOptionArray = []
        for(let i= 0 ; i<num; i=i+jump){
            timeOptionArray.push(i);
        }
        return (timeOptionArray.map((i, index)=><option value={i}>{this.pad(i,width)}</option>))
    }

    pad = (n, width, z) =>{
        z = z || '0';
        n = n + '';
        return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
    }

    render(){
        let message = null;
        var style ={
            height: '100vh'
        }
        if (this.state.success === false) {
            message = <div className="alert alert-danger alert-dismissible row m-2" role="alert">
                <div className="col-11">
                    {this.state.errorMessage}
                </div>
                <div><button type="button" className="close" data-dismiss="alert"><span aria-hidden="true">×</span><span className="sr-only">Close</span></button></div>
            </div>
        }else if(this.state.success === true){
            message = <div className="alert alert-success alert-dismissible row m-2" role="alert">
                <div className="col-11">
                    Course Created Successfully
                </div>
                <div><button type="button" className="close" data-dismiss="alert"><span aria-hidden="true">×</span><span className="sr-only">Close</span></button></div>
            </div>
        }
        return (
            <div className="home-parent-container">
                <Header /> 
                <div className="bg-grey" style={style}> 
                    <div className="row mt-5 container">
                        <SidePane active="Create Course"/>
                        <div className="main-container col-9">
                            <section id="cover">
                                <div id="cover-caption">
                                    <div id="container" className="container">
                                        <div className="row">
                                            <div className="col-sm-10 offset-sm-1 text-center">
                                                <div className="info-form my-5 ">
                                                   {message}
                                                    <div className="row"> 
                                                        <h5 className="mb-5 col-12 text-center"><strong>Create Course</strong></h5>
                                                    </div>
                                                    <form onSubmit={this.onSubmitHandler} className=" justify-content-center">
                                                        <div className="form-group row">
                                                            <label className="col-3 font-weight-bold text-left"> Term </label>
                                                            <select id="inputState" className="col-9 form-control" name="Term" value={this.state.Term} onChange={this.onChange} required>
                                                                <option disabled="" hidden="" value="" selected>Term...</option>
                                                                <option value="Fall 2019">Fall 2019</option>
                                                                <option value="Spring 2020">Spring 2020</option>
                                                            </select>
                                                        </div>
                                                        <div className="form-group row">
                                                            <label className="col-3 font-weight-bold text-left"> Department Name </label>
                                                            <input type="text" className=" col-9 form-control text-uppercase" name="DepartmentName" placeholder="CMPE" onChange={this.onChange} value={this.state.DepartmentName} required/>
                                                        </div>
                                                        <div className="form-group row">
                                                            <label className="col-3 font-weight-bold text-left"> Instructor </label>
                                                            <input type="text" className=" col-9 form-control" placeholder="Instructor" name="Instructor" onChange={this.onChange} value={this.state.Instructor} required/>
                                                        </div>
                                                        <div className="form-group row">
                                                            <label className="col-3 font-weight-bold text-left"> Course Name </label>
                                                            <input type="text" className="col-9 form-control" placeholder="Cloud Computing" name="CourseName" onChange={this.onChange} value={this.state.CourseName} required/>
                                                        </div>
                                                        <div className="form-group row">
                                                            <label className="col-3 font-weight-bold text-left"> Fees </label>
                                                            <input type="number" className="col-9 form-control" placeholder="3000" name="Fees" onChange={this.onChange} value={this.state.Fees} required/>
                                                        </div>
                                                        <div className="form-group row">
                                                            <label className="col-3 font-weight-bold text-left"> Credits </label>
                                                            <input type="number" className="col-3 form-control" placeholder="3" name="Credit" onChange={this.onChange} value={this.state.Credit} required/>
                                                            <div className="col-1"></div>
                                                            <label className="col-2 font-weight-bold text-left"> Capacity </label>
                                                            <input type="number" className="col-3 form-control" placeholder="60" name="Capacity" onChange={this.onChange} value={this.state.Capacity} required/>
                                                        </div>
                                                        <div className="form-group row">
                                                            <label className="col-3 font-weight-bold text-left"> Schedule </label>
                                                            <div className="col-9 bg-white">
                                                                <div className="row">
                                                                    <label className="col-2 font-weight-bold text-center"> Day </label>
                                                                    <label className="col-5 font-weight-bold text-center"> From </label>
                                                                    <label className="col-5 font-weight-bold text-center"> To </label>
                                                                </div>
                                                                <div className="row">
                                                                    <select id="inputState" className="col-2 form-control" name="Day" value={this.state.Day} onChange={this.onChange} required>
                                                                        <option disabled="" hidden="" value="" selected>Day...</option>
                                                                        <option value="Mon">Mon</option>
                                                                        <option value="Tue">Tue</option>
                                                                        <option value="Wed">Wed</option>
                                                                        <option value="Thu">Thu</option>
                                                                        <option value="Fri">Fri</option>
                                                                        <option value="Sat">Sat</option>
                                                                        <option value="Sun">Sun</option>
                                                                    </select>
                                                                    <label className="col-5 font-weight-bold text-left"> 
                                                                        <div className = "row ml-1">
                                                                        <select id="inputState" className="col-5 form-control" name="StartHour" value={this.state.StartHour} onChange={this.onChange} required>
                                                                            <option disabled="" hidden="" value="" selected>hour</option>
                                                                            {this.timeOptions(24,1,2)}
                                                                        </select>
                                                                        <div className="col-1">:</div>
                                                                        <select id="inputState" className="col-5 form-control" name="StartMinutes" value={this.state.StartMinutes} onChange={this.onChange} required>
                                                                            <option disabled="" hidden="" value="" selected>Minute</option>
                                                                            {this.timeOptions(61,15,2)}
                                                                        </select>
                                                                        </div>
                                                                    </label>
                                                                    <label className="col-5 font-weight-bold text-left"> 
                                                                        <div className = "row ml-1">
                                                                        <select id="inputState" className="col-5 form-control" name="EndHour" value={this.state.EndHour} onChange={this.onChange} required>
                                                                            <option disabled="" hidden="" value="" selected>hour</option>
                                                                            {this.timeOptions(24,1,2)}
                                                                        </select>
                                                                        <div className="col-1">:</div>
                                                                        <select id="inputState" className="col-5 form-control" name="EndMinutes" value={this.state.EndMinutes} onChange={this.onChange} required>
                                                                            <option disabled="" hidden="" value="" selected>Minute</option>
                                                                            {this.timeOptions(61,15,2)}
                                                                        </select>
                                                                        </div>
                                                                    </label>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <button type="submit" className="btn btn-primary px-5">Create Course</button>
                                                    </form>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>
                        </div>
                    </div>
                </div>  
            </div>
        );
    }
}

export default CreateCourse;

