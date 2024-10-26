package db

import (
	"database/sql"
	"log"

	_ "github.com/mattn/go-sqlite3"
)

func Init()(*sql.DB ,error){
	db,err := sql.Open("sqlite3","./db.sqlite")
	if err != nil{
		log.Fatal("Failed to initialze the db-sqlite connection",err)
		return nil, err
	}
	if err := db.Ping(); err != nil {
        log.Fatal(err)
    }
	return db,nil
}