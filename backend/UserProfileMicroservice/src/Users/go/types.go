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

// Address Structure
type Address struct {
	AddressLine1 string `bson:"addressline1"`
	AddressLine2 string `bson:"addressline2"`
	City         string `bson:"city"`
	State        string `bson:"state"`
	Zip          string `bson:"zip"`
}

// User Structure
type User struct {
	UserID     int     `bson:"userid"`
	Firstname  string  `bson:"firstname"`
	Lastname   string  `bson:"lastname"`
	Role       string  `bson:"role"`
	Email      string  `bson:"email"`
	Password   string  `bson:"password"`
	Image      string  `bson:"image"`
	Address    Address `bson:"address"`
	Department string  `bson:"department"`
}

// Login Structure
type Login struct {
	Email    string `bson:"email"`
	Password string `bson:"password"`
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

var mongoURL string = "mongodb://admin:password1@ds033439.mlab.com:33439/universityportal"
var database string = "universityportal"
var collection string = "SJSU_Users"
