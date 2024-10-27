package handlers

import (
	"database/sql"
	"encoding/json"
	// "fmt"
	"log"
	"net/http"

	"github.com/tacherasasi/go-react/db" // Import the db package
)

var DB *sql.DB

type User struct{
    ID        int    `json:"id"` 
    Name      string `json:"name"`
    Email     string `json:"email"`
    Password  string `json:"password"`
}

func init() {//I am using this function to intialize the db in the file
    var err error
    DB, err = db.Init()
    if err != nil {
        log.Fatal("Failed to connect to the database:", err)
    }
}

func Register(w http.ResponseWriter, r *http.Request) {
    // Handle CORS preflight request
    if r.Method == http.MethodOptions {
        w.Header().Set("Access-Control-Allow-Origin", FrontendUrl)
        w.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS")
        w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
        w.WriteHeader(http.StatusOK)
        return
    }

    // Ensure this is a POST request
    if r.Method != http.MethodPost {
        http.Error(w, "Invalid request method", http.StatusMethodNotAllowed)
        return
    }

    // Set CORS headers and content type
    w.Header().Set("Access-Control-Allow-Origin", FrontendUrl)
    w.Header().Set("Content-Type", "application/json")

    // Database connected check
    if DB != nil {
        log.Println("Database connected successfully in register")
    }

    var user User
    if err := json.NewDecoder(r.Body).Decode(&user); err != nil {
        http.Error(w, err.Error(), http.StatusBadRequest)
        return
    }
    log.Println(user)

    // Logic to save user to DB would go here
}


func Login(w http.ResponseWriter, r *http.Request) {
    if DB != nil {
        log.Println("Database connected successfully in register")
    }
}
