package ekili

import (
	"bytes"
	"encoding/json"
	"fmt"
	"net/http"
)

// EkiliRelay handles email sending functionality using a provided API key.
// It connects to a remote API endpoint and sends email requests based on
// the given parameters.
type EkiliRelay struct {
	apiKey string // The API key required for authenticating requests
	apiURL string // The URL of the API endpoint for sending emails
}

// EmailResponse represents the response structure from the email sending operation
type EmailResponse struct {
	Status  string `json:"status"`
	Message string `json:"message"`
}

// emailRequest represents the structure of the email request payload
type emailRequest struct {
	To      string `json:"to"`
	Subject string `json:"subject"`
	Message string `json:"message"`
	Headers string `json:"headers"`
	APIKey  string `json:"apikey"`
}

// NewEkiliRelay creates a new instance of EkiliRelay with the provided API key
func NewEkiliRelay(apiKey string) *EkiliRelay {
	relay := &EkiliRelay{
		apiKey: apiKey,
		apiURL: "https://relay.ekilie.com/api/index.php",
	}
	fmt.Println("EkiliRelay connected")
	return relay
}

// SendEmail sends an email using the provided details.
// Parameters:
//   - to: The recipient's email address
//   - subject: The subject of the email
//   - message: The body of the email
//   - headers: Optional additional headers for the email
//
// Returns:
//   - EmailResponse containing the status and message of the operation
//   - error if something goes wrong during the process
func (e *EkiliRelay) SendEmail(to, subject, message, headers string) (*EmailResponse, error) {
	// Construct the payload to be sent to the API
	data := emailRequest{
		To:      to,
		Subject: subject,
		Message: message,
		Headers: headers,
		APIKey:  e.apiKey,
	}

	// Convert the data to JSON
	jsonData, err := json.Marshal(data)
	if err != nil {
		return &EmailResponse{
			Status:  "error",
			Message: fmt.Sprintf("Failed to marshal request: %v", err),
		}, err
	}

	// Create the HTTP request
	req, err := http.NewRequest("POST", e.apiURL, bytes.NewBuffer(jsonData))
	if err != nil {
		return &EmailResponse{
			Status:  "error",
			Message: fmt.Sprintf("Failed to create request: %v", err),
		}, err
	}

	// Set headers
	req.Header.Set("Content-Type", "application/json")

	// Send the request
	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		return &EmailResponse{
			Status:  "error",
			Message: fmt.Sprintf("Failed to send request: %v", err),
		}, err
	}
	defer resp.Body.Close()

	// Parse the response
	var result EmailResponse
	if err := json.NewDecoder(resp.Body).Decode(&result); err != nil {
		return &EmailResponse{
			Status:  "error",
			Message: fmt.Sprintf("Failed to decode response: %v", err),
		}, err
	}

	return &result, nil
}