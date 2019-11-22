package model

//Payment struct encapsulates data captured for a Fee Payment
type Payment struct {
	TransactionID int     `bson:"transactionid"`
	StudentID     int     `bson:"studentid"`
	StudentName   string  `bson:"studentname"`
	CourseID      int     `bson:"courseid"`
	Term          string  `bson:"term"`
	Fee           float64 `bson:"fees"`
}

// IDGenerator keeps a auto incremented sequence for a key
type IDGenerator struct {
	N   int    `bson:"n"`
	Key string `bson:"key"`
}
