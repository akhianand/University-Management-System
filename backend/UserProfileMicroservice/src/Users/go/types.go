package users

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

// User Structure
type User struct {
	UserID    int
	Firstname string
	Lastname  string
	Role      string
	Email     string
	Password  string
	Image     string
}

// Login Structure
type Login struct {
	Email    string
	Password string
}

//FormatHandlerFunc returns a handler function formatted as passed in argument
type FormatHandlerFunc func(*render.Render) http.HandlerFunc

// IDGenerator keeps a auto incremented sequence for a key
type IDGenerator struct {
	N   int    `bson:"n"`
	Key string `bson:"key"`
}

// var mongoURL string = os.Getenv("MONGO_URL")
// var database string = os.Getenv("DATABASE")
// var collection string = os.Getenv("COLLECTION")

var mongoURL string = "mongodb://localhost:27017"
var database string = "UniversityPortal"
var collection string = "Users"
