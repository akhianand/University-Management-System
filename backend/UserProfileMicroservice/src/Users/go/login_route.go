package users

import (
	"encoding/json"
	"log"
	"net/http"

	"github.com/unrolled/render"
	"golang.org/x/crypto/bcrypt"
	"gopkg.in/mgo.v2"
	"gopkg.in/mgo.v2/bson"
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

		user, err := retrieveUser(email)
		if err != nil {
			errorHandler(formatter, w, err)
			return
		}

		pwdMatch := comparePasswords(user.Password, []byte(password))
		if pwdMatch {
			formatter.JSON(w, http.StatusOK, user)
		} else {
			formatter.JSON(w, http.StatusNotFound, struct{ Message string }{"Passswords Don't Match"})
		}

	}
}

func retrieveUser(email string) (*User, error) {
	session, err := mgo.Dial(mongoURL)
	if err != nil {
		return nil, NewInternalServerError("Mongo Dial Error " + err.Error())
	}
	defer session.Close()
	session.SetMode(mgo.Monotonic, true)
	c := session.DB(database).C(collection)
	var user User
	err = c.Find(bson.M{"email": email}).One(&user)
	if err == mgo.ErrNotFound {
		return nil, NewEntityNotFoundError(email)
	}
	if err != nil {
		return nil, NewInternalServerError("Mongo find Error " + err.Error())
	}
	return &user, nil
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
