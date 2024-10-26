package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"strconv"

	"github.com/tacherasasi/go-react/handlers"
)

type Todo struct {
	ID    int    `json:"id"`
	Title string `json:"title"`
	Done  bool   `json:"done"`
	Body  string `json:"body"`
}

var todos []Todo // This slice will store our Todo items

func main() {
	fmt.Println("Server starting on port 4000")

	// ServeMux/Router to handle routing, similar to Fiber's app
	mux := http.NewServeMux()

	// Healthcheck endpoint to verify that the server is up and running
	mux.HandleFunc("GET /healthcheck", handlers.Healthcheck )

	// Endpoint to handle the creation of a new Todo item
	mux.HandleFunc("/api/todos", func(w http.ResponseWriter, r *http.Request) {
		// Handling CORS (in a basic way) by allowing requests from http://localhost:3000
		if r.Method == http.MethodOptions {
			w.Header().Set("Access-Control-Allow-Origin", "http://localhost:3000")
			w.Header().Set("Access-Control-Allow-Headers", "Origin, Content-Type, Accept")
			w.WriteHeader(http.StatusNoContent)
			return
		}

		w.Header().Set("Access-Control-Allow-Origin", "http://localhost:3000")
		w.Header().Set("Content-Type", "application/json")

		// Check request method type
		if r.Method == http.MethodPost {
			var todo Todo
			// Parse JSON body into Todo struct
			if err := json.NewDecoder(r.Body).Decode(&todo); err != nil {
				http.Error(w, err.Error(), http.StatusBadRequest)
				return
			}

			// Assign an ID to the new Todo and append it to our slice
			todo.ID = len(todos) + 1
			todos = append(todos, todo)

			// Respond with the updated list of todos
			json.NewEncoder(w).Encode(todos)
			return
		}

		// If method is GET, respond with the full list of todos
		if r.Method == http.MethodGet {
			json.NewEncoder(w).Encode(todos)
			return
		}

		// If method is anything else, respond with "Method Not Allowed"
		http.Error(w, "Method Not Allowed", http.StatusMethodNotAllowed)
	})

	// Endpoint to update a Todo as done using a PATCH request
	mux.HandleFunc("/api/todos/", func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Origin", "http://localhost:3000")
		w.Header().Set("Content-Type", "application/json")

		// Check if method is PATCH
		if r.Method == http.MethodPatch {
			// Extract the Todo ID from the URL
			idStr := r.URL.Path[len("/api/todos/"):]
			id, err := strconv.Atoi(idStr)
			if err != nil {
				http.Error(w, "Invalid ID", http.StatusBadRequest)
				return
			}

			// Find the Todo item by ID and mark it as done
			for i, t := range todos {
				if t.ID == id {
					todos[i].Done = true
					break
				}
			}

			// Respond with the updated list of todos
			json.NewEncoder(w).Encode(todos)
			return
		}

		// If method is not PATCH, respond with "Method Not Allowed"
		http.Error(w, "Method Not Allowed", http.StatusMethodNotAllowed)
	})

	// Starting the server on port 4000
	log.Fatal(http.ListenAndServe(":4000", mux))
}
