package courses

import (
	"net/http"
	"os"

	"github.com/unrolled/render"
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
	CourseID       int
	CourseName     string
	Instructor     string
	ClassTime      []Classtime
	Capacity       int
	Credit         int
	Term           string
	DepartmentName string
	Fees           float64
}

// IDGenerator keeps a auto incremented sequence for a key
type IDGenerator struct {
	N   int    `bson:"n"`
	Key string `bson:"key"`
}

var mongoURL string = os.Getenv("MONGO_URL")
var database string = os.Getenv("DATABASE")
var collection string = os.Getenv("COLLECTION")
