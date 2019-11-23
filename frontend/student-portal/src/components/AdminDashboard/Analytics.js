import React, {Component} from 'react';
import Header from '../Header/Header';
import {Pie, Bar, Doughnut, Line, HorizontalBar} from 'react-chartjs-2';
import axios from 'axios';
import { getURL } from '../../config/Config';

class Analytics extends Component {

    constructor(props) {
        super(props);
        
        this.state = {
            popularCoursedata : {},
            bestPerformingCourses : {
                labels: ["Cloud Computing", "Cloud Technologies", "Software Systems Engineering", "Distributed Systems", "Distributed Computing",""],
                datasets: [
                    {
                        label: "Best performing courses", data: [3.56,3.76,3.45,3.4, 3.57,0.0],
                        backgroundColor: ['#FF6384',
                        '#36A2EB',
                        '#FFCE56','#CCC',
                        '#4BC0C0']
                    }
                ]
            },
            worstPerformingCourses : {
                labels: ["CMPE 99", "CMPE 103", "CMPE 272", "CMPE 100",  "CMPE 281",""],
                datasets: [
                    {
                        label: "Worst performing courses", data: [3.2, 2.8, 3.0, 2.97, 3.02, 0.0],
                        backgroundColor: ['#FF6384',
                        '#36A2EB',
                        '#FFCE56','#CCC',
                        '#4BC0C0']
                    }
                ]
            },
        }
    }

    //
    componentDidMount() {
        this.getPopularCoursesData();
    }

    getPopularCoursesData = () => {
        axios.get(getURL('/click-count'))
            .then((res) => {
                //console.log(res.data.Response);
                let courseData = res.data.Response;
                courseData.sort((a,b) => parseInt(a.Clicks) > parseInt(b.Clicks) ? -1 : 1);  
                courseData = courseData.slice(0,5);          
                let labels = [];
                let valueData = [];
                for(let index in courseData) {
                    labels.push(courseData[index].CourseName);
                    valueData.push(courseData[index].Clicks);
                }
                console.log('click count ', courseData);
                 console.log('labels ', labels);
                 console.log('clicks ', valueData);
                 this.setState({
                    popularCoursedata : {
                        labels : labels,
                        datasets: [
                            {
                                label: "Popular Courses", data: valueData,
                                backgroundColor: ['#FF6384',
                                '#36A2EB',
                                '#FFCE56','#CCC',
                                '#4BC0C0']
                            }],
                    }
                 })
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

                    <div className=" mt-5 p-5">
                        <h3 className="text-align-center analytics-heading">Popular courses</h3>
                        <Doughnut data={this.state.popularCoursedata}/>
                    </div>
                    <hr className="mt-5"/>
                    <div className="row mt-5">
                        <div className="col-6 border-right">
                        <h3 className="text-align-center analytics-heading">Best performing courses</h3>
                            <Bar data={this.state.bestPerformingCourses}/>
                        </div>
                        <div className="col-6">
                        <h3 className="text-align-center analytics-heading">Worst performing courses</h3>
                            <HorizontalBar data={this.state.worstPerformingCourses}/>
                        </div>
                    </div>
                </div>  
            </div>
        )
    }
}

export default Analytics;