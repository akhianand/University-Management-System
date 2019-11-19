package model

//Cart struct encapsulates data captured for a Course in Cart collection
type CourseEnrollment struct {
	CourseId int     `bson:"CourseId"`
	CourseName     string     `bson:"CourseName"`
	DepartmentName string `bson:"DepartmentName"`
	StudentId int     `bson:"StudentId"`
	StudentName     string     `bson:"StudentName"`
	Term          string  `bson:"Term"`
	Fees        float64 `bson:"Fees"`
	IsEnrolled bool `bson: "IsEnrolled"`
	HasFeesPaid bool `bson: "HasFeesPaid"` 
}