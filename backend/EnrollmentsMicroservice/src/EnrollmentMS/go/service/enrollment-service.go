package service

import (
	model "EnrollmentMS/go/model"
	"EnrollmentMS/go/util"
	"log"
	"os"
	"encoding/json"
	"gopkg.in/mgo.v2"
	"gopkg.in/mgo.v2/bson"
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

func GetCart(studentId int) ([]model.CartItem) {
	log.Printf("Get Cart service method")	
	session, err := mgo.Dial(os.Getenv("MONGO_URL"))
	if err != nil {
		//this will crash the server
		util.FailOnError(err, "Mongo Dial Error")
	}
	defer session.Close()
	session.SetMode(mgo.Monotonic, true)	
	c := session.DB(os.Getenv("DATABASE")).C("cartItemCollection")
	var cartItems []model.CartItem = []model.CartItem{}
	err = c.Find(bson.M{"StudentId": studentId}).All(&cartItems)
	
	if err != nil {
		util.FailOnError(err, "Mongo find Error ")
	}
	

	return cartItems
	
	
}