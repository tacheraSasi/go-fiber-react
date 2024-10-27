package handlers

import (
	"database/sql"
	"log"
	"net/http"

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

func Register(w http.ResponseWriter, r *http.Request) {
    w.Header().Set("Access-Control-Allow-Origin", FrontendUrl)
	w.Header().Set("Content-Type", "application/json")
    if DB != nil {
        log.Println("Database connected successfully in register")
    }
}

func Login(w http.ResponseWriter, r *http.Request) {
    if DB != nil {
        log.Println("Database connected successfully in register")
    }
}
