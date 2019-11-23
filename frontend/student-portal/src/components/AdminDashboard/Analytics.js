import React, {Component} from 'react';
import Header from '../Header/Header';
import {Pie, Bar, Doughnut, Line, HorizontalBar} from 'react-chartjs-2';
import axios from 'axios';
import { getURL } from '../../config/Config';

class Analytics extends Component {

    constructor(props) {
        super(props);
        
        this.state = {
            popularCoursedata : {
                labels: ["2013", "2014", "2015", "2016", "2017"],
                datasets: [
                    {
                        label: "Classification based on Year", data: [10,15,20,25,30],
                        backgroundColor: ['#FF6384',
                        '#36A2EB',
                        '#FFCE56','#CCC',
                        '#4BC0C0']
                    }
                ]},
        }
    }

    //
    componentDidMount() {
        this.getPopularCoursesData();
    }

    getPopularCoursesData = () => {
        axios.get(getURL('/click-count'))
            .then((res) => {
                console.log('click count ', res);
            }) 
    }
    render() {
        return (
            <div>
                <Header/>
                <div className="container">
                    <div className="text-align-center mb-5 analytics-heading mt-5">
                        <h3>Analytics Dashboard</h3>
                    </div>
                    <div className="border mt-5">
                        <Doughnut data={this.state.popularCoursedata}/>
                    </div>
                    <hr className="mt-5"/>
                    <div className="row mt-5">
                        <div className="col-6 border">
                            <HorizontalBar data={this.state.popularCoursedata}/>
                        </div>
                        <div className="col-6 border">
                            <Doughnut data={this.state.popularCoursedata}/>
                        </div>
                    </div>
                </div>  
            </div>
        )
    }
}

export default Analytics;