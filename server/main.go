package main

import (
	"fmt"
	"log"
	"net/http"

	"github.com/tacherasasi/go-react/db"
	"github.com/tacherasasi/go-react/handlers" // Importing the handlers package
)

func main() {
	fmt.Println("Server starting on port 4000")

	// ServeMux/Router to handle routing
	mux := http.NewServeMux()

	//initializing the db
	db,err := db.Init()
	if err != nil {
		log.Fatal("failed to connect to the db")
	}else if db != nil {
		log.Fatal("Database connected successful")
	}


	// Setting up the routes and associating them with handlers
	mux.HandleFunc(" GET /healthcheck", handlers.Healthcheck)        // Healthcheck route
	mux.HandleFunc("/api/todos", handlers.HandleTodos)          // Main todos endpoint (POST/GET)
	mux.HandleFunc("/api/todos/", handlers.HandleTodoUpdate)    // Specific todo update endpoint (PATCH)

	// Starting the server
	log.Fatal(http.ListenAndServe(":4000", mux))
}
