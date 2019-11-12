package users

import (
	"encoding/json"
	"net/http"

	"github.com/unrolled/render"
	"gopkg.in/mgo.v2"
)

//SignUpHandler returns the Handler for Signing Up Request
func SignUpHandler(formatter *render.Render) http.HandlerFunc {
	return func(w http.ResponseWriter, req *http.Request) {
		var user User
		_ = json.NewDecoder(req.Body).Decode(&user)
		//Creating User
		go storeToMongo(user)
		formatter.JSON(w, http.StatusOK, struct{ Message string }{"Storing User to Database"})
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
