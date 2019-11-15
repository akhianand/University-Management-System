package users

import (
	"encoding/json"
	"log"
	"net/http"

	"github.com/unrolled/render"
	"golang.org/x/crypto/bcrypt"
	"gopkg.in/mgo.v2"
)

//SignUpHandler returns the Handler for Signing Up Request
func SignUpHandler(formatter *render.Render) http.HandlerFunc {
	return func(w http.ResponseWriter, req *http.Request) {
		var user User
		_ = json.NewDecoder(req.Body).Decode(&user)

		email := user.Email
		usx, err := retrieveUserByEmail(email)
		if err != nil {
			var pwd = user.Password
			hash := hashAndSalt([]byte(pwd))
			user.Password = hash
			//Creating User
			go storeToMongo(user)
			formatter.JSON(w, http.StatusOK, struct{ Message string }{"Storing User to Database"})
		} else {

			err = NewBadRequestError("User " + usx.Email + " already Exists")
			errorHandler(formatter, w, err)
			return
		}

	}
}

func storeToMongo(user User) {
	session, err := mgo.Dial(mongoURL)
	if err != nil {
		panic(err)
	}
	defer session.Close()
	session.SetMode(mgo.Monotonic, true)
	c := session.DB(database).C(collection)
	user.UserID, _ = NextSequence("user")
	if err := c.Insert(user); err != nil {
		panic(err)
	}
}

func hashAndSalt(pwd []byte) string {
	hash, err := bcrypt.GenerateFromPassword(pwd, bcrypt.MinCost)
	if err != nil {
		log.Println(err)
	}
	return string(hash)
}
