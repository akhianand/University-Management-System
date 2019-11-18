package util

import (
	"fmt"
	"log"
	http "net/http"

	"github.com/unrolled/render"
)

// FailOnError router utility
func FailOnError(err error, msg string) {
	if err != nil {
		log.Fatalf("%s: %s", msg, err)
		panic(fmt.Sprintf("%s: %s", msg, err))
	}
}

// LogErrorWithoutFailing router utility
func LogErrorWithoutFailing(err error, msg string) {
	if err != nil {
		log.Printf("%s: %s", msg, err)
	}
}

//ErrorHandler router utility
func ErrorHandler(formatter *render.Render, w http.ResponseWriter, err error) {
	switch err.(type) {
	case *BadRequestError:
		formatter.JSON(w, http.StatusBadRequest, struct {
			Success bool
			Message string
		}{
			false,
			err.Error(),
		})
		return
	case *InternalServerError:
		formatter.JSON(w, http.StatusInternalServerError, struct {
			Success bool
			Message string
		}{
			false,
			err.Error(),
		})
		return
	default:
		log.Printf("Internal Server Error: %s", err)
		formatter.JSON(w, http.StatusInternalServerError, struct {
			Success bool
			Message string
		}{
			false,
			"Internal Server Error",
		})
	}
}
