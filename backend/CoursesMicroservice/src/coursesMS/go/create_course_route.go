package courses

import (
	"encoding/json"
	"fmt"
	"net/http"

	"github.com/unrolled/render"
)

//CreateCourseHandler returns a Handler for CreateCourse Request
func CreateCourseHandler(formatter *render.Render) http.HandlerFunc {
	return func(w http.ResponseWriter, req *http.Request) {
		var c Course
		_ = json.NewDecoder(req.Body).Decode(&c)
		//storing course into mongo asynchronusly
		go storeToMongo(c)
		formatter.JSON(w, http.StatusOK, c)
	}
}

func storeToMongo(course Course) {
	//TODO: store course into mongo
	fmt.Println(course)
}
