package service

import (
	model "EnrollmentMS/go/model"
	"EnrollmentMS/go/util"
	"log"
	"os"
	//"encoding/json"
	"gopkg.in/mgo.v2"
	"gopkg.in/mgo.v2/bson"
)

func AddCourseToCart(cartItem *model.CourseEnrollment) (error) {
	log.Printf("Add Course To Cart service method")	
	session, err := mgo.Dial(os.Getenv("MONGO_URL"))
	//session, err := mgo.Dial(os.Getenv("localhost:27017"))
	if err != nil {
		//this will crash the server
		util.FailOnError(err, "Mongo Dial Error")
	}
	defer session.Close()
	session.SetMode(mgo.Monotonic, true)	
	c := session.DB(os.Getenv("DATABASE")).C("enrollment")
	if err := c.Insert(cartItem); err != nil {
		//this will crash the server
		util.FailOnError(err, "Mongo Insert Error")
	}

	return nil

}

func GetCart(studentId int) ([]model.CourseEnrollment) {
	log.Printf("Get Cart service method")	
	session, err := mgo.Dial(os.Getenv("MONGO_URL"))
	if err != nil {
		//this will crash the server
		util.FailOnError(err, "Mongo Dial Error")
	}
	defer session.Close()
	session.SetMode(mgo.Monotonic, true)	
	c := session.DB(os.Getenv("DATABASE")).C("enrollment")
	var cartItems []model.CourseEnrollment = []model.CourseEnrollment{}
	err = c.Find(bson.M{"StudentId": studentId, "isenrolled": false}).All(&cartItems)
	
	if err != nil {
		util.FailOnError(err, "Mongo find Error ")
	}
	
	return cartItems	
}

func EnrollCourse(studentId int, courseId int) (error) {
	log.Printf("Enroll Course service method")	
	session, err := mgo.Dial(os.Getenv("MONGO_URL"))
	if err != nil {
		//this will crash the server
		util.FailOnError(err, "Mongo Dial Error")
	}
	defer session.Close()
	session.SetMode(mgo.Monotonic, true)	
	c := session.DB(os.Getenv("DATABASE")).C("enrollment")

	// get courseEnrollment 
	var courseEnrollment model.CourseEnrollment
	err = c.Find(bson.M{"StudentId": studentId, "CourseId": courseId}).One(&courseEnrollment)
	courseEnrollment.IsEnrolled = true
	
	// update isEnrolled	
	err = c.Update(bson.M{"StudentId": studentId, "CourseId": courseId}, courseEnrollment)

	if err != nil {
		util.FailOnError(err, "Mongo Update Error")
	}
	
	return nil
	// add course to enrollmentCollection

}

func DropCourse(studentId int, courseId int) (error) {
	log.Printf("Drop Course service method")
	session, err := mgo.Dial(os.Getenv("MONGO_URL"))
	if err != nil {
		//this will crash the server
		util.FailOnError(err, "Mongo Dial Error")
	}
	defer session.Close()
	session.SetMode(mgo.Monotonic, true)	
	c := session.DB(os.Getenv("DATABASE")).C("enrollment")

	// delete course
	err = c.Remove(bson.M{"StudentId": studentId, "CourseId": courseId})

	if err != nil {
		util.FailOnError(err, "Mongo Delete Error")
	}

	return nil

}