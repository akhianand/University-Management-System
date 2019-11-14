package users

import (
	"encoding/json"
	"net/http"

	"github.com/unrolled/render"
)

//UpdateHandler : returns the Handler for UpdateProfile Request
func UpdateHandler(formatter *render.Render) http.HandlerFunc {
	return func(w http.ResponseWriter, req *http.Request) {
		var login Login
		_ = json.NewDecoder(req.Body).Decode(&login)
		formatter.JSON(w, http.StatusOK, struct{ Message string }{"Update Sucessfull"})
	}
}
