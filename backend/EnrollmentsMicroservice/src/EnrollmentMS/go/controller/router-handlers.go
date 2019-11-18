package controller

import (
	model "EnrollmentMS/go/model"
	"EnrollmentMS/go/service"
	"encoding/json"
	"log"
	"net/http"

	"github.com/unrolled/render"
)

//PingHandler returns a Handler for Ping Request
func PingHandler(formatter *render.Render) http.HandlerFunc {
	return func(w http.ResponseWriter, req *http.Request) {
		formatter.JSON(w, http.StatusOK, struct{ Message string }{"Enrollment API is up and running !!"})
	}
}

func AddCourseToCartHandler(formatter *render.Render) http.HandlerFunc {
	return func(w http.ResponseWriter, req *http.Request) {
		log.Printf("Add course to Cart handler function")
		var cartItem model.CartItem
		_ = json.NewDecoder(req.Body).Decode(&cartItem)
		service.AddCourseToCart(&cartItem)
		formatter.JSON(w, http.StatusOK, struct {
			Success       bool
			Message       string
		}{
			true,
			"Course Added to Cart Successfully",
		})
	}
}