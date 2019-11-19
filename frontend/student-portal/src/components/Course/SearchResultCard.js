import React, {Component} from 'react'
import { Link } from 'react-router-dom';

class SearchResultCard extends Component{
    render(){
        return (
            <div className="card m-3">
                <Link to={
                    {
                        pathname: "/courses/"+this.props.CourseID,
                    }

                } className="text-dark">
                    <div className="card-body mr-0 pr-0 py-0">
                        <div className="row search-card-body mr-0">
                            
                            <div className="col-12  position-relative">
                                <div className="row w-100 ml-3 my-3">
                                    <h5 className="card-title mb-0">{this.props.DepartmentName + this.props.CourseID}</h5>
                                </div>
                                <div className="row w-100 ml-3 mb-3">
                                    {this.props.CourseName}
                                </div>
                                <div className="row w-100 ml-2">
                                    <div className="card-text">
                                        <ul className="list-inline">
                                        <li className="list-inline-item  pl-2"><strong>Instructor: </strong> {this.props.Instructor}</li> 
                                            <li className="list-inline-item border-left pl-2"><strong>Capacity: </strong> {this.props.Capacity}</li> 
                                            <li className="list-inline-item border-left pl-2"><strong>Credit: </strong>  {this.props.Credit} </li> 
                                            <li className="list-inline-item border-left pl-2"><strong>Fees: </strong>{this.props.Fees}</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </Link>
            </div>
        );
    }
}

export default SearchResultCard;

