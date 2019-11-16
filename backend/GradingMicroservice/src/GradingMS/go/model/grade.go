package model

import (
	util "GradingMS/go/util"
	"log"
	"os"

	"gopkg.in/mgo.v2"
)

// Grade encapsulates a grade object
type Grade struct {
	StudentID    int    `bson:"studentid"`
	CourseID     int    `bson:"courseid"`
	Term         string `bson:"term"`
	Grade        string `bson:"grade"`
	InstructorID string `bson:"instructorid"`
}

// Insert inserts the grade document to mongo db
func (g *Grade) Insert() {
	log.Printf("Insert Grade dao method")
	session, err := mgo.Dial(os.Getenv("MONGO_URL"))
	if err != nil {
		//this will crash the server
		util.FailOnError(err, "Mongo Dial Error")
	}
	defer session.Close()
	session.SetMode(mgo.Monotonic, true)
	c := session.DB(os.Getenv("DATABASE")).C("grade")
	if err := c.Insert(g); err != nil {
		//this will crash the server
		util.FailOnError(err, "Mongo Insert Error")
	}
}

//Find ff
func (g *Grade) Find(gradeQueryFilter *GradeQueryFilter) ([]Grade, error) {
	log.Printf("Get Grade dao method")
	session, err := mgo.Dial(os.Getenv("MONGO_URL"))
	if err != nil {
		//this will crash the server
		util.FailOnError(err, "Mongo Dial Error")
	}
	defer session.Close()
	session.SetMode(mgo.Monotonic, true)
	c := session.DB(os.Getenv("DATABASE")).C("grade")
	var grades []Grade = []Grade{}
	err = c.Find(gradeQueryFilter).All(&grades)
	if err != nil {
		return nil, util.NewInternalServerError("Mongo find Error " + err.Error())
	}
	return grades, nil
}
