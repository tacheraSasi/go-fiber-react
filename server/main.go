package main

import (
	"fmt"
	"log"
	"net/http"

	"github.com/tacherasasi/go-react/db"	   //Importing the db package
	"github.com/tacherasasi/go-react/handlers" // Importing the handlers package
)
var print = fmt.Println

func main() {
	print("Server starting on port 4000")

	// ServeMux/Router to handle routing
	mux := http.NewServeMux()

	//initializing the db
	db,err := db.Init()
	if err != nil {
		print("failed to connect to the db")
	}else if db != nil {
		print("Database connected successful")
	}


	// Setting up the routes and associating them with handlers
	mux.HandleFunc(" GET /healthcheck", handlers.Healthcheck)        // Healthcheck route
	mux.HandleFunc("/api/todos", handlers.HandleTodos)          // Main todos endpoint (POST/GET)
	mux.HandleFunc("/api/todos/", handlers.HandleTodoUpdate)    // Specific todo update endpoint (PATCH)

	// Starting the server
	log.Fatal(http.ListenAndServe(":4000", mux))
}
