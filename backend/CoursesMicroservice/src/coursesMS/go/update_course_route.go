package courses

import (
	"encoding/json"
	"net/http"
	"strconv"

	"github.com/gorilla/mux"
	"github.com/unrolled/render"
	"gopkg.in/mgo.v2"
	"gopkg.in/mgo.v2/bson"
)

//UpdateCourseHandler returns a Handler for UpdateCourse Request
func UpdateCourseHandler(formatter *render.Render) http.HandlerFunc {
	return func(w http.ResponseWriter, req *http.Request) {
		params := mux.Vars(req)
		courseID, err := strconv.Atoi(params["CourseID"])
		if err != nil {
			err = NewBadRequestError("CourseID must be integer")
			errorHandler(formatter, w, err)
			return
		}
		var c Course
		_ = json.NewDecoder(req.Body).Decode(&c)
		c.CourseID = courseID
		err = updateCourse(courseID, c)
		if err != nil {
			if err == mgo.ErrNotFound {
				err = NewEntityNotFoundError(strconv.Itoa(courseID))
			}
			errorHandler(formatter, w, err)
			return
		}
		formatter.JSON(w, http.StatusOK, c)
	}
}

func updateCourse(courseID int, course Course) error {
	session, err := mgo.Dial(mongoURL)
	if err != nil {
		logErrorWithoutFailing(err, "Mongo Dial Error")
		return err
	}
	defer session.Close()
	c := session.DB(database).C(collection)
	if err := c.Update(bson.M{
		"courseid": courseID,
	}, course); err != nil {
		logErrorWithoutFailing(err, "Mongo Update Error")
		return err
	}
	return nil
}
