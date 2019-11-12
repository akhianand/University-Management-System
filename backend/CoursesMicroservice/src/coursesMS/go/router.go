package courses

import (
	"fmt"
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
		handler = Logger(handler, route.Name)

		router.
			Methods(route.Method).
			Path(route.Pattern).
			Name(route.Name).
			Handler(handler)
	}
	fmt.Println("MongoURL", mongoURL)
	fmt.Println("Database", database)
	fmt.Println("Collection", collection)
	return router
}

var routes = Routes{
	Route{
		"PingHandler",
		"GET",
		"/ping",
		PingHandler,
	},
	Route{
		"CreateCourseHandler",
		"POST",
		"/course",
		CreateCourseHandler,
	},
}
