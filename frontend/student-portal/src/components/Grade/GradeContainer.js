import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class GradeContainer extends Component {
    render() {
        return (
            <div>
                 <div className="p-4 mt-5 border grades-container">
                    <p className="section-headline">Grade</p>                
                    <div>
                        <Link to="/grades/view">View Grades >></Link>
                    </div>
                    <div>
                        <Link to="/">View unoffical transcript >></Link>
                    </div>
                    <div>
                        <Link to="/">My Progress >></Link>
                    </div>
                        
                </div>
            </div>
        )
    }
}

export default GradeContainer;