package controller

import (
	model "EnrollmentMS/go/model"
	"EnrollmentMS/go/util"
	"net/http"

	"github.com/gorilla/mux"
	"github.com/unrolled/render"
)

//NewRouter returns a new mux router for courses api
func NewRouter() *mux.Router {
	router := mux.NewRouter().StrictSlash(true)
	formatter := render.New(render.Options{
		IndentJSON: true,
	})
	for _, route := range routes {
		var handler http.Handler
		handler = route.GetFormattedHandlerFunc(formatter)
		handler = util.Logger(handler, route.Name)

		router.
			Methods(route.Method).
			Path(route.Pattern).
			Name(route.Name).
			Handler(handler)
	}
	return router
}

var routes = model.Routes{
	model.Route{
		"PingHandler",
		"GET",
		"/ping",
		PingHandler,
	},	
	model.Route{
		"AddCourseToCartHandler",
		"POST",
		"/addToCart",
		AddCourseToCartHandler,
	},
	model.Route{
		"GetCart",
		"GET",
		"/cart",
		CartHandler,
	},
	model.Route{
		"EnrollCourse",
		"POST",
		"/enroll",
		EnrollCourseHandler,
	},
	model.Route{
		"RetrieveEnrollment",
		"GET",
		"/enrollment",
		RetrieveEnrollmentHandler,
	},
	model.Route{
		"DropCourse",
		"POST",
		"/drop",
		DropCourseHandler,
	},
	model.Route{
		"GetEnrollmentsByCourse",
		"GET",
		"/getEnrollmentsByCourse",
		GetEnrollmentsByCourse,
	},
}