package handlers

/***
TODO:REMEMBER TO IMPLEMENT AUTHORIZATION IN THE SECTION
CURRENTLY THE API IS ACCESSIBLE TO EVERYONE .....
**/

import (
	"encoding/json"
	"errors"
	"fmt"
	"log"
	"net/http"

	"github.com/tacherasasi/go-react/utils"
)

type Project struct {
	ID        int    `json:"id"`
	Title     string `json:"title"`
	Desc      string `json:"desc"`
	Progress  string `json:"progress"`
	GithubURL string `json:"githubURL"`
	CreatedAt string `json:"createsAt"`
	Owner     string `json:"owner"`
}

type Owner struct{
	Owner string `json:"owner"`
}

func AddProject(w http.ResponseWriter, r *http.Request) {
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

	// Check database connection
	if DB == nil {
		http.Error(w, "Database not connected", http.StatusInternalServerError)
		return
	}

	var project Project

	if err := json.NewDecoder(r.Body).Decode(&project); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}
	fmt.Println(project)

	_, err := DB.Exec("INSERT INTO projects (title,description,progress,githubURL,owner) VALUES (?,?,?,?,?)", project.Title, project.Desc, project.Progress, project.GithubURL, project.Owner)
	if err != nil {
		log.Printf("Error while inserting the project %v", err)
		http.Error(w, "Failed to create the projects in the database", http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(map[string]string{"message": "success"})
}

func GetAllProjects(w http.ResponseWriter, r *http.Request) {
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

	// fmt.Println(r.Body)

	var owner Owner

	if err := json.NewDecoder(r.Body).Decode(&owner); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}
	// fmt.Println(owner)

	// rows, err := DB.Query("SELECT * FROM projects WHERE owner = ?",owner)
	rows, err := DB.Query("SELECT * FROM projects LIMIT 5")
	fmt.Println(rows)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	defer rows.Close()

	var projects []Project

	for rows.Next() {
		var project Project
		err := rows.Scan(
			&project.ID,
			&project.Title,
			&project.Desc,
			&project.Progress,
			&project.GithubURL,
			&project.CreatedAt,
			&project.Owner,
		)

		if err != nil{
			http.Error(w,err.Error(),http.StatusInternalServerError)
			return
		}

		projects = append(projects, project)


	}
	// fmt.Println(projects)

	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(projects)
}

func EditProject(w http.ResponseWriter, r *http.Request) {
	var project Project
	id := r.URL.Query().Get("id")
	fmt.Println(id)
	if id == "" {
		http.Error(w,"Missing id query param",http.StatusBadRequest);
		w.WriteHeader(http.StatusBadRequest)
		json.NewEncoder(w).Encode(map[string]string{"message": "Missing id query param"})
		return
		
	}
	// Handle CORS preflight request
	if r.Method == http.MethodOptions {
		w.Header().Set("Access-Control-Allow-Origin", FrontendUrl)
		w.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
		w.WriteHeader(http.StatusOK)
		return
	}

	if r.Method != http.MethodPut{
		http.Error(w, "Invalid request method", http.StatusMethodNotAllowed)
		return
	}

	w.Header().Set("Access-Control-Allow-Origins",FrontendUrl)
	w.Header().Set("Content-Type","application/json")

	if DB == nil {
		http.Error(w, "Database not connected", http.StatusInternalServerError)
		return
	}


	if err := json.NewDecoder(r.Body).Decode(&project);err != nil{
		http.Error(w, err.Error(), http.StatusBadRequest)
		utils.LogError(
			"Failed to  decode the json",
			err.Error(),
			"projects.go",
		)
		return

	}
}

func DeleteProject() {}
