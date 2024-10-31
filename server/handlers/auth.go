package handlers

import (
	"database/sql"
	"encoding/json"
	"time"

	// "fmt"
	"log"
	"net/http"

	// "github.com/dgrijalva/jwt-go"
	"github.com/golang-jwt/jwt/v4"
	"github.com/tacherasasi/go-react/db" // Import the db package
	"golang.org/x/crypto/bcrypt"
)

var DB *sql.DB

var JwtKey = []byte("secret")

type User struct {
	ID       int    `json:"id"`
	Name     string `json:"name"`
	Email    string `json:"email"`
	Password string `json:"password"`
}
// JWT claims structure
type Claims struct {
    Email string `json:"email"`
    jwt.RegisteredClaims
}

func init() {
	// Initialize the database connection
	var err error
	DB, err = db.Init()
	if err != nil {
		log.Fatal("Failed to connect to the database:", err)
	}
}

func encryptPassword(password string) string {
	// Hash the password with a cost of 10 (you can adjust this value)
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	if err != nil {
		log.Printf("Error while hashing password: %v", err)
		return ""
	}
	return string(hashedPassword)
}

func checkPassword(hashedPassword, password string) bool {
	err := bcrypt.CompareHashAndPassword([]byte(hashedPassword), []byte(password))
	return err == nil // returns true if the password matches
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

	// Check database connection
	if DB == nil {
		http.Error(w, "Database not connected", http.StatusInternalServerError)
		return
	}

	var user User
	if err := json.NewDecoder(r.Body).Decode(&user); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}
	log.Println("Received user registration data:", user)

	// Validating if user already exists
	var existingUser User
	err := DB.QueryRow("SELECT id, username, email FROM users WHERE email = ?", user.Email).Scan(&existingUser.ID, &existingUser.Name, &existingUser.Email)

	if err == nil {
		// User already exists
		http.Error(w, "User already exists", http.StatusConflict)
		return
	} else if err != sql.ErrNoRows {
		// Some other error occurred
		log.Printf("Error checking if user exists: %v", err) // Log the error
		http.Error(w, "Database error", http.StatusInternalServerError)
		return
	}

	// Insert the new user into the database
	hashedPassword := encryptPassword(user.Password) // Hash the password
	_, err = DB.Exec("INSERT INTO users (username, email, password) VALUES (?, ?, ?)", user.Name, user.Email, hashedPassword)
	if err != nil {
		log.Printf("Error inserting user into database: %v", err) // Log the error
		http.Error(w, "Failed to register user", http.StatusInternalServerError)
		return
	}

	// Respond with success
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(map[string]string{"message": "success"})
}

func Login(w http.ResponseWriter, r *http.Request) {
	if DB != nil {
		log.Println("Database connected successfully in Login")
	}

	// Handle CORS preflight
	if r.Method == http.MethodOptions {
		w.Header().Set("Access-Control-Allow-Origin", FrontendUrl)
		w.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
		w.WriteHeader(http.StatusOK)
		return
	}

	// Only allow POST requests
	if r.Method != http.MethodPost {
		http.Error(w, "Invalid request method", http.StatusMethodNotAllowed)
		return
	}
	
	// Set CORS headers and content type
	w.Header().Set("Access-Control-Allow-Origin", FrontendUrl)
	w.Header().Set("Content-Type", "application/json")
	

	// Decode JSON request to User struct
	var user User
	if err := json.NewDecoder(r.Body).Decode(&user); err != nil {
		http.Error(w, "Invalid JSON data", http.StatusBadRequest)
		return
	}
	log.Println("Received login User:", user)

	// Query for the existing user
	var existingUser User
	err := DB.QueryRow("SELECT id, username, email, password FROM users WHERE email = ?", user.Email).Scan(
		&existingUser.ID, &existingUser.Name, &existingUser.Email, &existingUser.Password,
	)
	if err != nil {
		http.Error(w, "User does not exist", http.StatusUnauthorized)
		log.Println(err)
		return
	}

	// Check password
	if !checkPassword(existingUser.Password, user.Password) {
		http.Error(w, "Invalid credentials", http.StatusUnauthorized)
		return
	}

	// Generate JWT token
	expirationTime := time.Now().Add(48 * time.Hour)
	claims := &Claims{
		Email: existingUser.Email,
		RegisteredClaims: jwt.RegisteredClaims{
			ExpiresAt: jwt.NewNumericDate(expirationTime),
		},
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	tokenString, err := token.SignedString(JwtKey)
	if err != nil {
		http.Error(w, "Could not create token", http.StatusInternalServerError)
		return
	}

	// Set JWT as a cookie (optional)
	http.SetCookie(w, &http.Cookie{
		Name:    "token",
		Value:   tokenString,
		Expires: expirationTime,
	})

	// Send response with the user data (excluding password) and the token
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)

	// Prepare the response structure
	response := map[string]interface{}{
		"message": "success",
		"token":   tokenString,
		"user": map[string]interface{}{
			"id":    existingUser.ID,
			"name":  existingUser.Name,
			"email": existingUser.Email,
		},
	}

	// Encode and send the response
	json.NewEncoder(w).Encode(response)
}


