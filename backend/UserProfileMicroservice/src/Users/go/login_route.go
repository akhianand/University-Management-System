package users

import (
	"encoding/json"
	"net/http"

	"github.com/unrolled/render"
	"gopkg.in/mgo.v2"
	"gopkg.in/mgo.v2/bson"
)

//LoginHandler : returns the Handler for Login Request
func LoginHandler(formatter *render.Render) http.HandlerFunc {
	return func(w http.ResponseWriter, req *http.Request) {
		var login Login
		decoder := json.NewDecoder(req.Body)
		err := decoder.Decode(&login)
		if err != nil {
			err = NewBadRequestError("Email is Invalid")
			errorHandler(formatter, w, err)
			return
		}
		email := login.Email
		// password := login.Password
		user, err := retrieveUser(email)
		if err != nil {
			errorHandler(formatter, w, err)
			return
		}
		formatter.JSON(w, http.StatusOK, user)

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
	err = c.Find(bson.M{"email": email}).One(&email)
	if err == mgo.ErrNotFound {
		return nil, NewEntityNotFoundError(email)
	}
	if err != nil {
		return nil, NewInternalServerError("Mongo find Error " + err.Error())
	}
	return &user, nil
}
