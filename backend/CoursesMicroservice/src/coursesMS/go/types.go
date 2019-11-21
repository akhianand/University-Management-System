package courses

import (
	"net/http"
	"os"

	"github.com/unrolled/render"
	"gopkg.in/mgo.v2/bson"
)

//Route struct containing Name, Method, Pattern, and HandlerFunc
type Route struct {
	Name                    string
	Method                  string
	Pattern                 string
	GetFormattedHandlerFunc FormatHandlerFunc
}

// Routes slice
type Routes []Route

//FormatHandlerFunc returns a handler function formatted as passed in argument
type FormatHandlerFunc func(*render.Render) http.HandlerFunc

// Classtime struct defines the day and time of class
type Classtime struct {
	Day          string
	StartHour    int
	StartMinutes int
	EndHour      int
	EndMinutes   int
}

// Course struct defining a course
type Course struct {
	CourseID       int         `bson:"courseid"`
	CourseName     string      `bson:"coursename"`
	Instructor     string      `bson:"instructor"`
	ClassTime      []Classtime `bson:"classtime"`
	Capacity       int         `bson:"capacity"`
	SeatsEnrolled  int         `bson:"seatsenrolled"`
	Credit         int         `bson:"credit"`
	Term           string      `bson:"term"`
	DepartmentName string      `bson:"departmentname"`
	Fees           float64     `bson:"fees"`
}

// IDGenerator keeps a auto incremented sequence for a key
type IDGenerator struct {
	N   int    `bson:"n"`
	Key string `bson:"key"`
}

//QueryFilter search query filter
type QueryFilter struct {
	CourseID       bson.M     `bson:"courseid"`
	Term           string     `bson:"term"`
	CourseName     bson.RegEx `bson:"coursename"`
	DepartmentName string     `bson:"departmentname"`
}

// CourseEnrollment courseEnrollment kafka object
type CourseEnrollment struct {
	CourseID       int `json:"CourseId"`
	CourseName     string
	DepartmentName string
	StudentID      int `json:"StudentId"`
	StudentName    string
	Term           string
	Fees           float64
	IsEnrolled     bool
	HasFeesPaid    bool
}

var mongoURL string = os.Getenv("MONGO_URL")
var database string = os.Getenv("DATABASE")
var collection string = os.Getenv("COLLECTION")
var kafkaServer string = os.Getenv("KAFKA_SERVER")
var kafkaClickTopic string = os.Getenv("COURSE_CLICK_TOPIC")
var kafkaEnrollmentTopic string = os.Getenv("ENROLLMENT_TOPIC")
