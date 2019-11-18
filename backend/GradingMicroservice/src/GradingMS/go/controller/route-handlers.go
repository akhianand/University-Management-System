package controller

import (
	model "GradingMS/go/model"
	service "GradingMS/go/service"
	"GradingMS/go/util"
	"encoding/json"
	"log"
	"net/http"
	"strconv"

	"gopkg.in/mgo.v2/bson"

	"github.com/unrolled/render"
)

//PingHandler returns a Handler for Ping Request
func PingHandler(formatter *render.Render) http.HandlerFunc {
	return func(w http.ResponseWriter, req *http.Request) {
		formatter.JSON(w, http.StatusOK, struct{ Message string }{"Grading API is up and running !!"})
	}
}

// SubmitGradeHandler returns a handler for Submit Grade Request
func SubmitGradeHandler(formatter *render.Render) http.HandlerFunc {
	return func(w http.ResponseWriter, req *http.Request) {
		log.Printf("Submit Grade Handler Function")
		var grade model.Grade
		_ = json.NewDecoder(req.Body).Decode(&grade)
		service.SubmitGrade(&grade)
		formatter.JSON(w, http.StatusOK, struct {
			Success bool
			Message string
		}{
			true,
			"Grade Submitted Successfully",
		})
	}
}

func GetGradesHandler(formatter *render.Render) http.HandlerFunc {
	return func(w http.ResponseWriter, req *http.Request) {
		log.Printf("Get Grades Handler Function")
		filter, err := createQueryFilter(req)
		if err != nil {
			util.ErrorHandler(formatter, w, err)
			return
		}
		var grades []model.Grade
		err, grades = service.GetGrades(filter)
		if err != nil {
			util.ErrorHandler(formatter, w, err)
			return
		}
		formatter.JSON(w, http.StatusOK, grades)
	}
}

func createQueryFilter(req *http.Request) (*model.GradeQueryFilter, error) {
	StudentID := req.URL.Query().Get("StudentID")
	CourseID := req.URL.Query().Get("CourseID")
	Term := req.URL.Query().Get("Term")
	var filter model.GradeQueryFilter
	filter.StudentID = bson.M{"$gte": -1}
	filter.CourseID = bson.M{"$gte": -1}
	filter.Term = bson.RegEx{
		Pattern: ".*",
		Options: "i",
	}
	if StudentID != "" {
		id, err := strconv.Atoi(StudentID)
		if err != nil {
			return nil, util.NewBadRequestError("StudentID must be integer")
		}
		filter.StudentID = bson.M{"$eq": id}
	}
	if CourseID != "" {
		id, err := strconv.Atoi(CourseID)
		if err != nil {
			return nil, util.NewBadRequestError("CourseID must be integer")
		}
		filter.CourseID = bson.M{"$eq": id}
	}
	if Term != "" {
		filter.Term = bson.RegEx{
			Pattern: "^" + Term + "$",
			Options: "i",
		}
	}
	return &filter, nil
}
