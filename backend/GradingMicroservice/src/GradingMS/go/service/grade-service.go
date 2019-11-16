package service

import (
	model "GradingMS/go/model"
	"GradingMS/go/util"
	"log"
	"os"

	"gopkg.in/mgo.v2"
)

//SubmitGrade validates request for submitting grade and inserts in DB
func SubmitGrade(grade *model.Grade) {

	// TODO validation checks
	//check student enrolled in course
	//check instructor exists
	//check instructor teaches that course
	//
	log.Printf("Insert Grade dao method")
	session, err := mgo.Dial(os.Getenv("MONGO_URL"))
	if err != nil {
		//this will crash the server
		util.FailOnError(err, "Mongo Dial Error")
	}
	defer session.Close()
	session.SetMode(mgo.Monotonic, true)
	c := session.DB(os.Getenv("DATABASE")).C("grade")
	if err := c.Insert(grade); err != nil {
		//this will crash the server
		util.FailOnError(err, "Mongo Insert Error")
	}
}

//GetGrades returns slice of grades for the query
func GetGrades(gradeQueryFilter *model.GradeQueryFilter) (error, []model.Grade) {
	log.Printf("Get Grade dao method")
	session, err := mgo.Dial(os.Getenv("MONGO_URL"))
	if err != nil {
		//this will crash the server
		util.FailOnError(err, "Mongo Dial Error")
	}
	defer session.Close()
	session.SetMode(mgo.Monotonic, true)
	c := session.DB(os.Getenv("DATABASE")).C("grade")
	var grades []model.Grade = []model.Grade{}
	err = c.Find(gradeQueryFilter).All(&grades)
	if err != nil {
		return util.NewInternalServerError("Mongo find Error " + err.Error()), nil
	}
	return nil, grades
}
