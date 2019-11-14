package users

import (
	"encoding/json"
	"net/http"

	"github.com/unrolled/render"
)

//LoginHandler : returns the Handler for Login Request
func LoginHandler(formatter *render.Render) http.HandlerFunc {
	return func(w http.ResponseWriter, req *http.Request) {
		var login Login
		_ = json.NewDecoder(req.Body).Decode(&login)
		formatter.JSON(w, http.StatusOK, struct{ Message string }{"Login Sucessfull"})
	}
}
