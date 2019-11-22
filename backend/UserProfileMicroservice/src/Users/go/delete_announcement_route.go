package users

import (
	"encoding/json"
	"net/http"
	"strconv"

	"github.com/unrolled/render"
	"gopkg.in/mgo.v2"
	"gopkg.in/mgo.v2/bson"
)

//DeleteAnnouncementHandler returns a Handler for Delete Announcement Request
func DeleteAnnouncementHandler(formatter *render.Render) http.HandlerFunc {
	return func(w http.ResponseWriter, req *http.Request) {
		userID, err := strconv.Atoi(req.URL.Query()["UserID"][0])
		if err != nil {
			err = NewBadRequestError("UserID must be integer")
			errorHandler(formatter, w, err)
			return
		}
		var announcement Announcement
		_ = json.NewDecoder(req.Body).Decode(&announcement)
		
		err = deleteMessage(userID, announcement)
		if err != nil {
			if err == mgo.ErrNotFound {
				err = NewEntityNotFoundError(strconv.Itoa(userID))
			}
			errorHandler(formatter, w, err)
			return
		}
		formatter.JSON(w, http.StatusOK, struct {
			Success bool
			Message string
		}{
			true,
			"Announcement Sucessfully Removed",
		})
	}
}

func deleteMessage(userID int, announcement Announcement) error {
	session, err := mgo.Dial(mongoURL)
	if err != nil {
		logErrorWithoutFailing(err, "Mongo Dial Error")
		return err
	}
	defer session.Close()
	c := session.DB(database).C(collection)

	change := bson.M{"$pull": bson.M{"announcements": announcement}}

	if err := c.Update(bson.M{"userid":userID}, change);
	
	
	err != nil {
		logErrorWithoutFailing(err, "Mongo Update Error")
		return err
	}
	return nil
}
