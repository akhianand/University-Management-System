import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class CoursesContainer extends Component {
    render() {
        return (
            <div>
                <div className="p-4 border courses-container">
                    <p className="section-headline">Courses</p>
                    <div>
                        <table class="table table-bordered">
                            <thead>
                                <tr>                                
                                <th scope="col">Class</th>
                                <th scope="col">Schedule</th>                                
                                </tr>
                            </thead>
                            <tbody>
                                <tr>                                
                                <td>CMPE 281</td>
                                <td>SA 9 AM to 12 PM</td>
                                
                                </tr>
                                <tr>
                                
                                <td>CMPE 295 A</td>
                                <td>FR 6 PM to 8:45 PM</td>                                
                                </tr>
                                <tr>                               
                                <td>CMPE 294</td>
                                <td>WE 6 PM to 8:45 PM</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div>
                        <Link to="/">View Course Information >>></Link>
                    </div>
                </div>
            </div>
        )
    }
}

export default CoursesContainer;