package utils

import (
	"fmt"
	"log"

	ekili "github.com/tacherasasi/go-react/ekilirelay"
)

// LogError sends an error notification email using EkiliRelay.
func LogError(title, desc, location string) {
	relay := ekili.NewEkiliRelay("relay-6087f8c42d70f0650b9f023adc")
	
	// Construct the email content with title and description
	message := fmt.Sprintf("Error: %s\n\n Location: %s\n\n Details: %s", title,location, desc)
	
	// Send the email with EkiliRelay
	response, err := relay.SendEmail(
		"support@ekilie.com",
		title,
		message,
		"From: Go React <tacherasasi@gmail.com>", 
	)

	if err != nil {
		log.Printf("Error sending email: %v\n", err)
		return
	}

	log.Printf("Email sent successfully: %s - %s\n", response.Status, response.Message)
}
