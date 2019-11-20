package model

// Grade encapsulates a grade object
type Grade struct {
	StudentID   int    `bson:"studentid"`
	StudentName string `bson:"studentname"`
	CourseID    int    `bson:"courseid"`
	CourseName  string `bson:"coursename"`
	Term        string `bson:"term"`
	Grade       string `bson:"grade"`
}
