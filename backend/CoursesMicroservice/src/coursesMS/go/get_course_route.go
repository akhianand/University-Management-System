package courses

import (
	"net/http"
	"strconv"

	"github.com/gorilla/mux"
	"github.com/unrolled/render"
	"gopkg.in/mgo.v2"
	"gopkg.in/mgo.v2/bson"
)

//GetCourseHandler returns a Handler for Get Course Request
func GetCourseHandler(formatter *render.Render) http.HandlerFunc {
	return func(w http.ResponseWriter, req *http.Request) {
		params := mux.Vars(req)
		courseID, err := strconv.Atoi(params["CourseID"])
		if err != nil {
			err = NewBadRequestError("CourseID must be integer")
			errorHandler(formatter, w, err)
			return
		}
		course, err := retrieveCourseMongo(courseID)
		if err != nil {
			errorHandler(formatter, w, err)
			return
		}
		formatter.JSON(w, http.StatusOK, course)
		go saveCourseToKafka(*course)
	}
}

func retrieveCourseMongo(courseID int) (*Course, error) {
	session, err := mgo.Dial(mongoURL)
	if err != nil {
		return nil, NewInternalServerError("Mongo Dial Error " + err.Error())
	}
	defer session.Close()
	session.SetMode(mgo.Monotonic, true)
	c := session.DB(database).C(collection)
	var course Course
	err = c.Find(bson.M{"courseid": courseID}).One(&course)
	if err == mgo.ErrNotFound {
		return nil, NewEntityNotFoundError(strconv.Itoa(courseID))
	}
	if err != nil {
		return nil, NewInternalServerError("Mongo find Error " + err.Error())
	}
	return &course, nil
}
