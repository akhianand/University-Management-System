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

//DeleteCourseHandler returns a Handler for Delete Course Request
func DeleteCourseHandler(formatter *render.Render) http.HandlerFunc {
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
		err = deleteCourse(courseID, c)
		if err != nil {
			if err == mgo.ErrNotFound {
				err = NewEntityNotFoundError(strconv.Itoa(courseID))
			}
			errorHandler(formatter, w, err)
			return
		}
		formatter.JSON(w, http.StatusOK, struct {
			Success bool
			Message string
		}{
			true,
			"Course " + strconv.Itoa(courseID) + " is Successfully deleted",
		})
	}
}

func deleteCourse(courseID int, course Course) error {
	session, err := mgo.Dial(mongoURL)
	if err != nil {
		logErrorWithoutFailing(err, "Mongo Dial Error")
		return err
	}
	defer session.Close()
	c := session.DB(database).C(collection)
	if err := c.Remove(bson.M{
		"courseid": courseID,
	}); err != nil {
		logErrorWithoutFailing(err, "Mongo Update Error")
		return err
	}
	return nil
}
