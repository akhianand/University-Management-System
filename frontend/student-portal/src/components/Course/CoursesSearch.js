import React, { Component } from 'react';
import Header from '../Header/Header';
import SidePane from '../SidePane/SidePane'
import { getURL } from '../../config/Config';
import axios from 'axios'
import SearchResultCard from './SearchResultCard';

class CoursesSearch extends Component {

    constructor(props) {
        super(props)
        this.state = {
            CourseID: null,
            Comparator: "eq",
            DepartmentName: null,
            Term: null,
            CourseName: null,
            response: [],
            errorMessage: ""
        }
        this.onChange = this.onChange.bind(this);
        this.onSubmitHandler = this.onSubmitHandler.bind(this);
    }

    onSubmitHandler = async (e) => {
        e.preventDefault();
        const url = getURL("/courses");
        const params = {
            CourseID: this.state.CourseID,
            Comparator: this.state.Comparator,
            DepartmentName: this.state.DepartmentName,
            Term: this.state.Term,
            CourseName: this.state.CourseName,
        }
        try{
            let response = await axios.get(url,{params})
            console.log(response.data)
            this.setState({response: response.data , errorMessage: ""})
        }catch(error){
            if (!error.response) {
                console.log("Server is down!");
                this.setState({response: [], errorMessage: "Server is down!"})
            }else if(error.response.status === 400 ){
                this.setState({response: [], errorMessage: error.response.data.Message})
            }else {
                this.setState({response: [], errorMessage: "Something went wrong, try again later!"})
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

    createCard = () => {
        return(
            this.state.response.map((result, index) =><SearchResultCard
            key={"searchcard_"+index}
            CourseID = {result.CourseID}
            CourseName = {result.CourseName}
            DepartmentName = {result.DepartmentName}
            Fees = {result.Fees}
            Credit = {result.Credit}
            Instructor= {result.Instructor}
            Capacity= {result.Capacity}
            ClassTime = {result.ClassTime}
            ></SearchResultCard>
        ));
    }

    render() {
        let redirectVar = null;
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
        return (
            <div className="home-parent-container">
                <Header /> 
                <div className="bg-grey" style={style}> 
                    <div className="row mt-5 container">
                        <SidePane active="Courses"/>
                        <div className="main-container col-9">
                            <section id="cover">
                                <div id="cover-caption">
                                    <div id="container" className="container">
                                        <div className="row">
                                            <div className="col-sm-10 offset-sm-1 text-center">
                                                <div className="info-form my-5 ">
                                                   {errorMessage}
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
                                                            <label className="col-3 font-weight-bold text-left"> Course ID </label>
                                                            <select id="inputState" className="col-3 form-control" name="Comparator" value={this.state.Comparator} onChange={this.onChange}>
                                                                <option value="eq" selected>is exactly</option>
                                                                <option value="gte">is greater than or equal to</option>
                                                                <option value="lte" >is less than or equal to</option>
                                                            </select>
                                                            <input type="number" className=" col-6 form-control" placeholder="123" name="CourseID" onChange={this.onChange} value={this.state.CourseID}/>
                                                        </div>
                                                        <div className="form-group row">
                                                            <label className="col-3 font-weight-bold text-left"> Course Name </label>
                                                            <input type="text" className="col-9 form-control" placeholder="Cloud Computing" name="CourseName" onChange={this.onChange} value={this.state.CourseName}/>
                                                        </div>
                                                        <button type="submit" className="btn btn-primary px-5">Search</button>
                                                    </form>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>
                            {this.createCard()}
                        </div>
                    </div>
                </div>  
            </div>
        );
    }
}

export default CoursesSearch;