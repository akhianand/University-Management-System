package util

import (
	"GradingMS/go/model"
	"os"

	"gopkg.in/mgo.v2"
	"gopkg.in/mgo.v2/bson"
)

const (
	idgenCollection = "idgen"
)

//NextSequence auto increments and returns the sequence for a key, default 100, -1 on error
func NextSequence(key string) (int, error) {
	session, err := mgo.Dial(os.Getenv("MONGO_URL"))
	if err != nil {
		//Instead of crashing the server on error  only logging the error
		LogErrorWithoutFailing(err, "Auto Increament Sequence Mongo Dial Error")
		return -1, err
	}
	defer session.Close()
	change := mgo.Change{
		Update:    bson.M{"$inc": bson.M{"n": 1}},
		ReturnNew: true,
	}
	var result model.IDGenerator
	c := session.DB(os.Getenv("DATABASE")).C(idgenCollection)
	_, err = c.Find(bson.M{"key": key}).Apply(change, &result)

	if err == mgo.ErrNotFound {
		//initial value for sequence is 100
		err = c.Insert(model.IDGenerator{Key: key, N: 100})
		if err != nil {
			return -1, err
		}
		return 100, nil
	} else if err != nil {
		return -1, err
	}
	return result.N, nil
}
