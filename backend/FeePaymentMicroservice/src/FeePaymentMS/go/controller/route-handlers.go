package controller

import (
	model "FeePaymentMS/go/model"
	"FeePaymentMS/go/service"
	"encoding/json"
	"fmt"
	"log"
	"net/http"

	"github.com/unrolled/render"
)

//PingHandler returns a Handler for Ping Request
func PingHandler(formatter *render.Render) http.HandlerFunc {
	return func(w http.ResponseWriter, req *http.Request) {
		formatter.JSON(w, http.StatusOK, struct{ Message string }{"Payments API is up and running !!"})
	}
}

//MakePaymentHandler returns a Handler for making a payment
func MakePaymentHandler(formatter *render.Render) http.HandlerFunc {
	return func(w http.ResponseWriter, req *http.Request) {
		log.Printf("Make payment handler function")
		fmt.Println("Make payment handler router function")
		var payment model.Payment
		_ = json.NewDecoder(req.Body).Decode(&payment)
		transactionID, _ := service.MakePayment(&payment)
		formatter.JSON(w, http.StatusOK, struct {
			Success       bool
			Message       string
			TransactionID int
		}{
			true,
			"Fee Payment Transaction Recorded Successfully",
			transactionID,
		})
	}
}
