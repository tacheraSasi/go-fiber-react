package main

import (
	"fmt"
	"log"
	"net/http"

	"github.com/tacherasasi/go-react/handlers" // Importing the handlers package
)

func main() {
	fmt.Println("Server starting on port 4000")

	// ServeMux/Router to handle routing
	mux := http.NewServeMux()

	// Setting up the routes and associating them with handlers
	mux.HandleFunc("/healthcheck", handlers.Healthcheck)        // Healthcheck route
	mux.HandleFunc("/api/todos", handlers.HandleTodos)          // Main todos endpoint (POST/GET)
	mux.HandleFunc("/api/todos/", handlers.HandleTodoUpdate)    // Specific todo update endpoint (PATCH)

	// Starting the server
	log.Fatal(http.ListenAndServe(":4000", mux))
}
