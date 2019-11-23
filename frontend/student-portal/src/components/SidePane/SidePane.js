import React, {Component} from 'react';


class SidePane extends Component {
    constructor(props) {
        super(props)
        this.state = {
            active : this.props.active
        }
        this.rolePane = this.rolePane.bind(this)
    }

    rolePane = () => {
        if(localStorage.getItem("role") === "Instructor"){
            return (
                <div>
                    <a href="/createcourse" className={"list-group-item list-group-item-action" + (this.state.active ==="Create Course" ?" active":"")}>Create Course</a>
                    <a href="/grades/submit" className={"list-group-item list-group-item-action" + (this.state.active ==="SubmitGrades" ?" active":"")}>Submit Grades</a>
                    <a href="#" className={"list-group-item list-group-item-action" + (this.state.active ==="Admin Dashboard" ?" active":"")}>Admin Dashboard</a>
					<a href="/addannouncement" className={"list-group-item list-group-item-action" + (this.state.active ==="MakeAccouncements" ?" active":"")}>Make Accouncements</a>                    
                </div>
            );
        }else{
            return (
                <div>
                    <a href="#" className={"list-group-item list-group-item-action" + (this.state.active ==="Enrollment" ?" active":"")}>Enrollment</a>
                    <a href="#" className={"list-group-item list-group-item-action" + (this.state.active ==="Fee Payment" ?" active":"")}>Fee Payment</a>
                    <a href="/grades/view" className={"list-group-item list-group-item-action" + (this.state.active ==="ViewGrades" ?" active":"")}>Grades</a>
                </div>
            );
        }
        
    }

    render() {
        return (
             <div className="side-pane col-3">
                <div className="p-2">
                    <div className="list-group">
                        <a href="/" className={"list-group-item list-group-item-action "+ (this.state.active ==="Student Center" ?" active":"") }>Student Center</a>
                        <a href="/profile" className={"list-group-item list-group-item-action" + (this.state.active ==="Profile" ?" active":"")}>Profile</a>
                        <a href="/courses" className={"list-group-item list-group-item-action" + (this.state.active ==="Courses" ?" active":"")}>Courses</a>
						<a href="/announcements" className={"list-group-item list-group-item-action" + (this.state.active ==="Announcements" ?" active":"")}>Announcements</a>
                    

                        {this.rolePane()}
                    </div>
                </div>
            </div>
        )
    }
}

export default SidePane;