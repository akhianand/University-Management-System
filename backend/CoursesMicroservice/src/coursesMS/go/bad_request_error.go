package courses

import "fmt"

// BadRequestError struct
type BadRequestError struct {
	message string
}

// NewBadRequestError creates new badrequest error and returns it address
func NewBadRequestError(message string) *BadRequestError {
	return &BadRequestError{
		message: fmt.Sprintf("%s: %s", "Bad Request", message),
	}
}

//Error returns the string representation of error
func (e *BadRequestError) Error() string {
	return e.message
}
