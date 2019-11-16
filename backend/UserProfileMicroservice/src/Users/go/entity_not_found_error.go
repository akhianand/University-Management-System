package users

import "fmt"

// EntityNotFoundError struct
type EntityNotFoundError struct {
	message string
}

// NewEntityNotFoundError creates new EntityNotFound error and returns its address
func NewEntityNotFoundError(message string) *EntityNotFoundError {
	return &EntityNotFoundError{
		message: fmt.Sprintf("%s: %s", "Entity Not Found", message),
	}
}

//Error returns the string representation of error
func (e *EntityNotFoundError) Error() string {
	return e.message
}
