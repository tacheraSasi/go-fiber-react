package db

import (
	"database/sql"
	"log"
)

func Init()(*sql.DB ,error){
	db,err := sql.Open("sqlite3","./db.sqlite")
	if err != nil{
		log.Fatal("Failed to initialze the db-sqlite connection")
		return nil, err
	}
	return db,nil
}