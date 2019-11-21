package model

// Grade encapsulates a grade object
type Grade struct {
	StudentID    int    `bson:"studentid"`
	CourseID     int    `bson:"courseid"`
	Term         string `bson:"term"`
	Grade        string `bson:"grade"`
	InstructorID string `bson:"instructorid"`
}
