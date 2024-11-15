package db

import (
	"database/sql"
	"fmt"
	"log"

	_ "github.com/mattn/go-sqlite3"
	"github.com/tacherasasi/go-react/utils"
)

var DB *sql.DB

// Init initializes the SQLite database connection and creates the users table
func Init() (*sql.DB, error) {
	db, err := sql.Open("sqlite3", "/home/tach/tach/go/ekilihive/server/db.sqlite")
	if err != nil {
		log.Fatal("Failed to initialize the SQLite connection:", err)
		utils.LogError(
			"Failed to initialize the SQLite connection", 
            fmt.Sprintf("Connection error: %v",err),
            "db/init.go",
        )
		return nil, err
	}

	// Verify the connection
	if err := db.Ping(); err != nil {
		errorMessage := fmt.Sprintf("Database ping failed: %v", err)
		log.Fatal(errorMessage)
		utils.LogError("Database Connection Error", errorMessage, "db/init.go")
		return nil, err
	}

	// SQL to create the users table if it doesn't exist
	createTableSQL := `
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT NOT NULL,
        email TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL
    );`

	// Execute the SQL to create the table
	_, err = db.Exec(createTableSQL)
	if err != nil {
		log.Fatal("Failed to create users table:", err)
        utils.LogError(
			"Failed to create users table", 
            fmt.Sprintf("Creatin user table: %v",err),
            "db/init.go",
        )
		return nil, err
	}

	log.Println("Database initialized and users table checked/created successfully.")
	DB = db
	return DB, nil
}
