package model

import (
	"net/http"

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