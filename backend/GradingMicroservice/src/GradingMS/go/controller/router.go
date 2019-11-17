package controller

import (
	model "GradingMS/go/model"
	"GradingMS/go/util"
	"net/http"

	"github.com/gorilla/mux"
	"github.com/unrolled/render"
)

//NewRouter returns a new mux router for grading api
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
		"SubmitGrade",
		"POST",
		"/grade",
		SubmitGradeHandler,
	},
	model.Route{
		"GetGradesHandler",
		"GET",
		"/grades",
		GetGradesHandler,
	},
}
