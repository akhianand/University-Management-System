package controller

import (
	model "EnrollmentMS/go/model"
	"EnrollmentMS/go/service"
	"encoding/json"
	"log"
	"net/http"
	"EnrollmentMS/go/util"
	"github.com/unrolled/render"
	"strconv"
	//"github.com/gorilla/mux"
	
)

//PingHandler returns a Handler for Ping Request
func PingHandler(formatter *render.Render) http.HandlerFunc {
	return func(w http.ResponseWriter, req *http.Request) {
		formatter.JSON(w, http.StatusOK, struct{ Message string }{"Enrollment API is up and running !!"})
	}
}

func AddCourseToCartHandler(formatter *render.Render) http.HandlerFunc {
	return func(w http.ResponseWriter, req *http.Request) {
		//Allow CORS here By * or specific origin
		w.Header().Set("Access-Control-Allow-Origin", "*")

		w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
		
		log.Printf("Add course to Cart handler function")
		var cartItem model.CourseEnrollment
		_ = json.NewDecoder(req.Body).Decode(&cartItem)
		cartItem.IsEnrolled = false
		cartItem.HasFeesPaid = false		
		service.AddCourseToCart(&cartItem)
		formatter.JSON(w, http.StatusOK, struct {
			Success       bool
			Message       string
		}{
			true,
			"Course Added to Cart Successfully",
		})
	}
}

func CartHandler(formatter *render.Render) http.HandlerFunc {
	return func(w http.ResponseWriter, req *http.Request) {
		//Allow CORS here By * or specific origin
		w.Header().Set("Access-Control-Allow-Origin", "*")

		w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
		log.Printf("Inside Cart handler function")
		keys, queryErr := req.URL.Query()["StudentId"]
		if !queryErr || len(keys[0]) < 1 {
			util.FailOnError(nil, "Query params error")
			//return
		}
		// params := mux.Vars(req)
		//log.Printf("req: ", req.URL.Query(), "params: ", params)
		//studentId, err := strconv.Atoi(params["StudentId"])
		studentId, err := strconv.Atoi(keys[0])
		if err != nil {
			util.FailOnError(err, "Conversion error")
			//return
		}
		// 
		log.Printf("student ID ", studentId)
		var cart []model.CourseEnrollment = service.GetCart(studentId)
		formatter.JSON(w, http.StatusOK, cart)
	}
}

func EnrollCourseHandler(formatter *render.Render) http.HandlerFunc {
	return func(w http.ResponseWriter, req *http.Request) {
		log.Printf(" Inside Enroll Course handler function")
		var cartItem model.CourseEnrollment
		_ = json.NewDecoder(req.Body).Decode(&cartItem)		
		out, err := json.Marshal(cartItem)
		log.Printf("out : " + string(out))
		if err != nil {

		}
		
		service.EnrollCourse(cartItem.StudentId, cartItem.CourseId)
		formatter.JSON(w, http.StatusOK, struct {
			Success       bool
			Message       string
		}{
			true,
			"Course Enrolled Successfully",
		})
	}
}

func DropCourseHandler(formatter *render.Render) http.HandlerFunc {
	return func(w http.ResponseWriter, req *http.Request) {
		log.Printf(" Inside Drop Course handler function")
		var courseEnrollment model.CourseEnrollment 
		_ = json.NewDecoder(req.Body).Decode(&courseEnrollment)	
		out, err := json.Marshal(courseEnrollment)
		log.Printf("out : " + string(out))
		if err != nil {

		}

		service.DropCourse(courseEnrollment.StudentId, courseEnrollment.CourseId)
		formatter.JSON(w, http.StatusOK, struct {
			Success       bool
			Message       string
		}{
			true,
			"Course Dropped Successfully",
		})

	}
}
