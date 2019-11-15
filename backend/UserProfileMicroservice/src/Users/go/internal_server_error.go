package users

import "fmt"

// InternalServerError struct
type InternalServerError struct {
	message string
}

// NewInternalServerError creates new internal server error and returns it address
func NewInternalServerError(message string) *InternalServerError {
	return &InternalServerError{
		message: fmt.Sprintf("%s: %s", "Internal Server Error", message),
	}
}

//Error returns the string representation of error
func (e *InternalServerError) Error() string {
	return e.message
}
