import React, { Component } from 'react';
import Header from '../Header/Header';
import SidePane from '../SidePane/SidePane'
//import Navbar from './../nav/navbar';
//import './home.css';
//import { Link } from 'react-router-dom';
//import { Redirect } from 'react-router';

class CoursesSearch extends Component {

    constructor(props) {
        super(props)
        this.state = {
            CourseID: null,
            Comparator: null,
            DepartmentName: null,
            Term: null,
            CourseName: null
        }
        this.stateChangeHandler = this.stateChangeHandler.bind(this);
        this.onSubmitHandler = this.onSubmitHandler.bind(this);
    }

    onSubmitHandler = (e) => {

    }

    stateChangeHandler = (e) => {
        let updateState = {}
        updateState[e.target.name] = e.target.value
        this.setState(updateState);
    }

    render() {
        let redirectVar = null;
        var style ={
            height: '100vh'
        }
        return (
            <div className="home-parent-container">
                <Header /> 
                <div className="bg-grey" style={style}> 
                    <div className="row mt-5 container">
                        <SidePane/>
                        <div className="main-container col-9">
                            <section id="cover">
                                <div id="cover-caption">
                                    <div id="container" className="container">
                                        <div className="row">
                                            <div className="col-sm-10 offset-sm-1 text-center">
                                                
                                                <div className="info-form my-5 ">
                                                    <form action="" className=" justify-content-center">
                                                        <div className="form-group row">
                                                            <label className="col-3 font-weight-bold text-left"> Term </label>
                                                            <select id="inputState" className="col-9 form-control">
                                                                <option selected>Fall 2019</option>
                                                                <option>Spring 2020</option>
                                                            </select>
                                                        </div>
                                                        <div className="form-group row">
                                                            <label className="col-3 font-weight-bold text-left"> Department Name </label>
                                                            <input type="text" className=" col-9 form-control text-uppercase" placeholder="CMPE"/>
                                                        </div>
                                                        <div className="form-group row">
                                                            <label className="col-3 font-weight-bold text-left"> Course ID </label>
                                                            <select id="inputState" className="col-3 form-control">
                                                                <option selected>is exactly </option>
                                                                <option>is greater than or equal to</option>
                                                                <option>is less than or equal to</option>
                                                            </select>
                                                            <input type="number" className=" col-6 form-control" placeholder="123"/>
                                                        </div>
                                                        <div className="form-group row">
                                                            <label className="col-3 font-weight-bold text-left"> Course Name </label>
                                                            <input type="text" className="col-9 form-control" placeholder="Cloud Computing"/>
                                                        </div>
                                                        <button type="submit" className="btn btn-primary px-5">Search</button>
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

export default CoursesSearch;