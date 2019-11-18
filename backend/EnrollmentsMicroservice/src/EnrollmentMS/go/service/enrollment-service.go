package service

import (
	"EnrollmentMS/go/model"
	"EnrollmentMS/go/util"
	"log"
	"os"
	"gopkg.in/mgo.v2"
)

func AddCourseToCart(cartItem *model.CartItem) (error) {
	log.Printf("Add Course To Cart service method")	
	session, err := mgo.Dial(os.Getenv("MONGO_URL"))
	//session, err := mgo.Dial(os.Getenv("localhost:27017"))
	if err != nil {
		//this will crash the server
		util.FailOnError(err, "Mongo Dial Error")
	}
	defer session.Close()
	session.SetMode(mgo.Monotonic, true)	
	c := session.DB(os.Getenv("DATABASE")).C("cartItemCollection")
	if err := c.Insert(cartItem); err != nil {
		//this will crash the server
		util.FailOnError(err, "Mongo Insert Error")
	}

	return nil

}