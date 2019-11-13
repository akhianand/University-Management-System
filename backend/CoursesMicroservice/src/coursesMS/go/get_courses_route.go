package courses

import (
	"net/http"
	"strconv"

	"github.com/unrolled/render"
	"gopkg.in/mgo.v2"
	"gopkg.in/mgo.v2/bson"
)

//GetCoursesHandler returns a Handler for CreateCourse Request
func GetCoursesHandler(formatter *render.Render) http.HandlerFunc {
	return func(w http.ResponseWriter, req *http.Request) {
		filter, err := createFilter(req)
		if err != nil {
			errorHandler(formatter, w, err)
			return
		}
		var courses []Course
		courses, err = retrieveCoursesMongo(filter)
		if err != nil {
			errorHandler(formatter, w, err)
			return
		}
		formatter.JSON(w, http.StatusOK, courses)
	}
}

func createFilter(req *http.Request) (*QueryFilter, error) {

	id := req.URL.Query().Get("CourseID")
	comparator := req.URL.Query().Get("Comparator")
	departmentName := req.URL.Query().Get("DepartmentName")
	term := req.URL.Query().Get("Term")
	courseName := req.URL.Query().Get("CourseName")
	var filter QueryFilter
	if departmentName == "" {
		return nil, NewBadRequestError("DepartmentName required")
	}
	filter.DepartmentName = departmentName
	if term == "" {
		return nil, NewBadRequestError("Term is required")
	}
	filter.Term = term
	filter.CourseID = bson.M{"$gte": -1}
	if id != "" {
		courseID, err := strconv.Atoi(id)
		if err != nil {
			return nil, NewBadRequestError("CourseID must be integer")
		}
		switch comparator {
		case "eq":
			filter.CourseID = bson.M{"$eq": courseID}
		case "lte":
			filter.CourseID = bson.M{"$lte": courseID}
		case "gte":
			filter.CourseID = bson.M{"$gte": courseID}
		default:
			return nil, NewBadRequestError("Compartor must be one of eq, lte, gte")
		}
	}
	filter.CourseName = bson.RegEx{
		Pattern: ".*" + courseName + ".*",
		Options: "i",
	}

	return &filter, nil
}

func retrieveCoursesMongo(filter *QueryFilter) ([]Course, error) {
	session, err := mgo.Dial(mongoURL)
	if err != nil {
		return nil, NewInternalServerError("Mongo Dial Error " + err.Error())
	}
	defer session.Close()
	session.SetMode(mgo.Monotonic, true)
	c := session.DB(database).C(collection)
	var courses []Course = []Course{}
	err = c.Find(*filter).All(&courses)
	if err != nil {
		return nil, NewInternalServerError("Mongo find Error " + err.Error())
	}
	return courses, nil
}
