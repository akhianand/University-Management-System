package model

//Payment struct encapsulates data captured for a Fee Payment
type Payment struct {
	TransactionID int     `bson:"transactionid"`
	StudentID     int     `bson:"studentid"`
	Term          string  `bson:"term"`
	Amount        float64 `bson:"amount"`
}
