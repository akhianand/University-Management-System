package controller

import (
	model "GradingMS/go/model"
	service "GradingMS/go/service"
	"encoding/json"
	"log"
	"net/http"

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
