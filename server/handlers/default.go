package handlers

import (
	"encoding/json"
	"net/http"
	"strconv"
	
)

// Todo struct to represent a todo item
type Todo struct {
	ID    int    `json:"id"`
	Title string `json:"title"`
	Done  bool   `json:"done"`
	Body  string `json:"body"`
}

var todos []Todo // Slice to store todos

var FrontendUrl string = "http://localhost:5173"


// Healthcheck handler for "/healthcheck" route
func Healthcheck(w http.ResponseWriter, r *http.Request) {
	w.Write([]byte("OK"))
}

// HandleTodos handles the "/api/todos" endpoint
func HandleTodos(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", FrontendUrl)
	w.Header().Set("Content-Type", "application/json")

	if r.Method == http.MethodOptions {
		// Handle CORS preflight request
		w.Header().Set("Access-Control-Allow-Headers", "Origin, Content-Type, Accept")
		w.WriteHeader(http.StatusNoContent)
		return
	}

	switch r.Method {
	case http.MethodPost:
		var todo Todo
		if err := json.NewDecoder(r.Body).Decode(&todo); err != nil {
			http.Error(w, err.Error(), http.StatusBadRequest)
			return
		}

		// Add new todo
		todo.ID = len(todos) + 1
		todos = append(todos, todo)

		// Respond with the updated list of todos
		json.NewEncoder(w).Encode(todos)

	case http.MethodGet:
		// Respond with the current list of todos
		json.NewEncoder(w).Encode(todos)

	default:
		http.Error(w, "Method Not Allowed", http.StatusMethodNotAllowed)
	}
}

// HandleTodoUpdate handles updating a specific todo by ID on "/api/todos/:id/done"
func HandleTodoUpdate(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", FrontendUrl)
	w.Header().Set("Content-Type", "application/json")

	if r.Method == http.MethodPatch {
		// Extract ID from the URL
		idStr := r.URL.Path[len("/api/todos/"):]
		id, err := strconv.Atoi(idStr)
		if err != nil {
			http.Error(w, "Invalid ID", http.StatusBadRequest)
			return
		}

		// Update the "Done" status of the todo with the matching ID
		for i, t := range todos {
			if t.ID == id {
				todos[i].Done = true
				break
			}
		}

		// Respond with the updated list of todos
		json.NewEncoder(w).Encode(todos)
	} else {
		http.Error(w, "Method Not Allowed", http.StatusMethodNotAllowed)
	}
}
