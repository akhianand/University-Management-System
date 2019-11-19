package users

import (
	"net/http"
	"strconv"

	"github.com/unrolled/render"
	"gopkg.in/mgo.v2"
	"gopkg.in/mgo.v2/bson"
)

//GetUserHandler returns a Handler for Get User Request
func GetUserHandler(formatter *render.Render) http.HandlerFunc {
	return func(w http.ResponseWriter, req *http.Request) {
		UserID, err := strconv.Atoi(req.URL.Query()["UserID"][0])
		if err != nil {
			err = NewBadRequestError("UserID must be integer")
			errorHandler(formatter, w, err)
			return
		}
		user, err := retrieveUserByID(UserID)
		if err != nil {
			errorHandler(formatter, w, err)
			return
		}
		user.Password = ""
		formatter.JSON(w, http.StatusOK, user)
	}
}

func retrieveUserByID(id int) (*User, error) {
	session, err := mgo.Dial(mongoURL)
	if err != nil {
		return nil, NewInternalServerError("Mongo Dial Error " + err.Error())
	}
	defer session.Close()
	session.SetMode(mgo.Monotonic, true)
	c := session.DB(database).C(collection)
	var user User
	err = c.Find(bson.M{"userid": id}).One(&user)
	if err == mgo.ErrNotFound {
		return nil, NewEntityNotFoundError(strconv.Itoa(id))
	}
	if err != nil {
		return nil, NewInternalServerError("Mongo find Error " + err.Error())
	}
	return &user, nil
}

func retrieveUserByEmail(email string) (*User, error) {
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
