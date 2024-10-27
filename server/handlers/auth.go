package handlers

import (
    "database/sql"
    "log"

    "github.com/tacherasasi/go-react/db" // Import the db package
)

var DB *sql.DB

func init() {//I am using this function to intialize the db in the file
    var err error
    DB, err = db.Init()
    if err != nil {
        log.Fatal("Failed to connect to the database:", err)
    }
}

func Register() {
    if DB != nil {
        log.Println("Database connected successfully in register")
    }
}

func Login() {
    if DB != nil {
        log.Println("Database connected successfully in register")
    }
}
