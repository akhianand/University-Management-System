import React, {Component} from 'react';


class SidePane extends Component {
    render() {
        return (
             <div className="side-pane col-3">
                <div className="p-2">
                    <div className="list-group">
                        <a href="/" className="list-group-item list-group-item-action active">Student Center</a>
                        <a href="/courses" className="list-group-item list-group-item-action">Courses</a>
                        <a href="#" className="list-group-item list-group-item-action">Enrollment</a>
                        <a href="#" className="list-group-item list-group-item-action">Fee Payment</a>
                        <a href="#" className="list-group-item list-group-item-action">Profile</a>
                        <a href="#" className="list-group-item list-group-item-action">Admin Dashboard</a>
                    </div>
                </div>
            </div>
        )
    }
}

export default SidePane;