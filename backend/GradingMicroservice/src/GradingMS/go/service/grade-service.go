package service

import (
	model "GradingMS/go/model"
)

//SubmitGrade validates request for submitting grade and inserts in DB
func SubmitGrade(grade *model.Grade) {

	// TODO validation checks
	//check student enrolled in course
	//check instructor exists
	//check instructor teaches that course
	//
	grade.Insert()
}
