package model

import (
	"net/http"

	"gopkg.in/mgo.v2/bson"

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

// GradeQueryFilter query filter to retrieve grade
type GradeQueryFilter struct {
	StudentID bson.M     `bson:"studentid"`
	CourseID  bson.M     `bson:"courseid"`
	Term      bson.RegEx `bson:"term"`
}
