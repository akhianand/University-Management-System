import React, {Component} from 'react';
import Header from '../Header/Header';
import {Pie, Bar, Doughnut, Line, HorizontalBar} from 'react-chartjs-2';

class Analytics extends Component {

    constructor(props) {
        super(props);
        
        this.state = {
            popularCoursedata : {
                labels: ["2013", "2014", "2015", "2016", "2017"],
                datasets: [
                    {
                        label: "Classification based on Year", data: [10,15,20,25,30],
                        backgroundColor: ["#fccf00","rgba(75, 192, 192, 0.8)",
                        "rgba(153, 102, 255, 0.8)","rgba(15, 159, 64, 0.8)","rgba(255,255,0)","#00FFFF" ]
                    }
                ]},
        }
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
                            <Doughnut data={this.state.popularCoursedata}/>
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