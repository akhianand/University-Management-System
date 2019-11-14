package courses

import (
	"encoding/json"
	"net/http"

	"github.com/unrolled/render"
	"gopkg.in/mgo.v2"
)

//CreateCourseHandler returns a Handler for CreateCourse Request
func CreateCourseHandler(formatter *render.Render) http.HandlerFunc {
	return func(w http.ResponseWriter, req *http.Request) {
		var c Course
		_ = json.NewDecoder(req.Body).Decode(&c)
		//storing course into mongo asynchronusly
		go storeToMongo(c)
		formatter.JSON(w, http.StatusOK, struct {
			Success bool
			Message string
		}{
			true,
			"creating course asynchronusly",
		})
	}
}

func storeToMongo(course Course) {
	session, err := mgo.Dial(mongoURL)
	if err != nil {
		//this will crash the server
		failOnError(err, "Mongo Dial Error")
	}
	defer session.Close()
	session.SetMode(mgo.Monotonic, true)
	c := session.DB(database).C(collection)
	course.CourseID, _ = NextSequence("course")
	if err := c.Insert(course); err != nil {
		//this will crash the server
		failOnError(err, "Mongo Insert Error")
	}
}
