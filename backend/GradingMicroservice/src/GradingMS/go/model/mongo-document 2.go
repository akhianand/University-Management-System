package model

// MongoDocument is a collection of CRUD operation functions applicable on a mongo document
type MongoDocument interface {
	Insert(collection string)
}
