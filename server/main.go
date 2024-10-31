package main

import (
	"fmt"
	"log"
	"net/http"

	"github.com/tacherasasi/go-react/db" //Importing the db package
	ekili "github.com/tacherasasi/go-react/ekilirelay"
	"github.com/tacherasasi/go-react/handlers" // Importing the handlers package
)
var print = fmt.Println

var FrontendUrl string = "http://localhost:5173"

func main() {
	print("Server starting on port 4000")
	// handlers.LogError("testing","testing","200","main.go")

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
	mux.HandleFunc("/auth/register",handlers.Register)		// User registration
	mux.HandleFunc("/auth/login",handlers.Login)			// User login

	mux.HandleFunc("/healthcheck", handlers.Healthcheck)   // Healthcheck route
	mux.HandleFunc("/api/todos", handlers.HandleTodos)          // Main todos endpoint (POST/GET)
	mux.HandleFunc("/api/todos/", handlers.HandleTodoUpdate)    // Specific todo update endpoint (PATCH)

	// Starting the server
	log.Fatal(http.ListenAndServe(":4000", mux))

	//testing ekilirelay
	relay := ekili.NewEkiliRelay("your-api-key")
    
    response, err := relay.SendEmail(
        "recipient@example.com",
        "Test Subject",
        "Test Message",
        "", // optional headers
    )
    
    if err != nil {
        fmt.Printf("Error sending email: %v\n", err)
        return
    }
    
    fmt.Printf("Email sent: %s - %s\n", response.Status, response.Message)
}
