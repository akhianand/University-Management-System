package courses

import (
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

	return router
}

var routes = Routes{
	Route{
		"pingHandler",
		"GET",
		"/ping",
		PingHandler,
	},
}
