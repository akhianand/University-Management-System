package model

//Payment struct encapsulates data captured for a Fee Payment
type Payment struct {
	TransactionID int     `bson:"transactionid"`
	StudentID     int     `bson:"studentid"`
	StudentName   string  `bson:"studentname"`
	CourseID      string  `bson:"courseid"`
	Term          string  `bson:"term"`
	Fee           float64 `bson:"fees"`
}
