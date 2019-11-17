package service

import (
	"FeePaymentMS/go/model"
	"FeePaymentMS/go/util"
	"log"
	"os"

	"gopkg.in/mgo.v2"
)

//MakePayment creates the Fee Payment transaction record in DB
func MakePayment(payment *model.Payment) {
	log.Printf("Make payment service method")
	session, err := mgo.Dial(os.Getenv("MONGO_URL"))
	if err != nil {
		//this will crash the server
		util.FailOnError(err, "Mongo Dial Error")
	}
	defer session.Close()
	session.SetMode(mgo.Monotonic, true)
	c := session.DB(os.Getenv("DATABASE")).C("payment")
	if err := c.Insert(payment); err != nil {
		//this will crash the server
		util.FailOnError(err, "Mongo Insert Error")
	}
}
