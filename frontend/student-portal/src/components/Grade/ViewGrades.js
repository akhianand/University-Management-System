import React, {Component} from 'react';
import Header from '../Header/Header';
import SidePane from '../SidePane/SidePane'

class ViewGrades extends Component {
    constructor(props){
        super(props);
    }
   render(){
       var errorMessage = null
    var style ={
        height: '100vh'
    }
       return(
        <div className="home-parent-container">
                <Header /> 
                <div className="bg-grey" style={style}> 
                    <div className="row mt-5 container">
                        <SidePane active="ViewGrades"/>
                        <div className="main-container col-8 bg-white p-3">
                            {errorMessage}
                            <div className="row"> 
                                <h5 className="col-12 text-center"> hello</h5>
                            </div>
                            <div className="row mx-3">
                                <div className="col-3 text-left"> <strong>Term:</strong></div>
                                <div className="col-4 text-left"> hello </div>
                            </div>
                            <div className="row mx-3">
                                <div className="col-3 text-left"> <strong>Course:</strong></div>
                                <div className="col-4 text-left"> hello </div>
                            </div>
                            <div className="row mx-3">
                                <div className="col-3 text-left"> <strong>Instructor:</strong></div>
                                <div className="col-4 text-left"> hello </div>
                            </div>
                            <div className="m-3 row">
                            <div className="mr-0 col-3 text-left"> <strong>Capacity: </strong> h </div>
                            <div className="col-3 text-left"> <strong>Seats Enrolled: </strong> e</div>
                            <div className="col-3 text-left"> <strong>Credits: </strong> l</div>
                            <div className="col-3 text-left"> <strong>Fees: </strong> l </div>
                            </div>
                            <br/>
                            <div className="row mx-3">
                                <div className="col-12"><strong>0</strong></div>
                            </div>
                            
                            <div className="row m-3">
                              
                            </div>
                        </div>
                    </div>
                </div>  
            </div>

       );
   } 
}
export default ViewGrades;