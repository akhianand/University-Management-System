package users

import (
	"encoding/json"
	"log"
	"net/http"

	"github.com/unrolled/render"
	"golang.org/x/crypto/bcrypt"
)

//LoginHandler : returns the Handler for Login Request
func LoginHandler(formatter *render.Render) http.HandlerFunc {
	return func(w http.ResponseWriter, req *http.Request) {
		decoder := json.NewDecoder(req.Body)
		var login Login
		err := decoder.Decode(&login)
		if err != nil {
			err = NewBadRequestError("Email is Invalid")
			errorHandler(formatter, w, err)
			return
		}
		email := login.Email
		password := login.Password

		user, err := retrieveUserByEmail(email)
		if err != nil {
			errorHandler(formatter, w, err)
			return
		}

		pwdMatch := comparePasswords(user.Password, []byte(password))
		if pwdMatch {
			formatter.JSON(w, http.StatusOK, user)
		} else {
			err = NewBadRequestError("Passwwords Don't Match")
			errorHandler(formatter, w, err)
			return
		}

	}
}

func comparePasswords(hashedPwd string, plainPwd []byte) bool {
	byteHash := []byte(hashedPwd)
	err := bcrypt.CompareHashAndPassword(byteHash, plainPwd)
	if err != nil {
		log.Println(err)
		return false
	}
	return true
}
