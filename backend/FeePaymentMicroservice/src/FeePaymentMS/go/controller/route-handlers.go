package controller

import (
	model "FeePaymentMS/go/model"
	"FeePaymentMS/go/service"
	"encoding/json"
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
func MakePaymentHandler(formatter *render.Render) http.HandlerFunc {
	return func(w http.ResponseWriter, req *http.Request) {
		log.Printf("Make payment handler function")
		var payment model.Payment
		_ = json.NewDecoder(req.Body).Decode(&payment)
		service.MakePayment(&payment)
		formatter.JSON(w, http.StatusOK, struct {
			Success bool
			Message string
		}{
			true,
			"Fee Payment Transaction Recorded Successfully",
		})
	}
}
