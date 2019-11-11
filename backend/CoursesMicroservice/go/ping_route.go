package courses

import (
	"net/http"

	"github.com/unrolled/render"
)

//PingHandler returns a Handler for Ping Request
func PingHandler(formatter *render.Render) http.HandlerFunc {
	return func(w http.ResponseWriter, req *http.Request) {
		formatter.JSON(w, http.StatusOK, struct{ Message string }{"Courses API is alive!"})
	}
}
