package utils

import (
	"fmt"
	"log"
	"os"

	ekili "github.com/tacherasasi/go-react/ekilirelay"
)

// LogError sends an error notification email using EkiliRelay.
func LogError(title, desc, location string) {
	file, err := os.OpenFile("../app.log", os.O_APPEND|os.O_CREATE|os.O_WRONLY, 0644)
	relay := ekili.NewEkiliRelay("relay-6087f8c42d70f0650b9f023adc")

	if err != nil{
		log.Fatal("Failed to open the log file",err)
	}

	defer file.Close() //defer delays the execution till the surrounding function is finished

   // Create a new logger that writes to the file, with date and time in each entry
   logger := log.New(file, "LOG: ", log.LstdFlags|log.Lshortfile)

	
	// Constructing the email content with title and description
	message := fmt.Sprintf("Error: %s\n\n Location: %s\n\n Details: %s", title,location, desc)
	logger.Println(message)//logging the error in the ../app.log file
	
	// Sending the email with EkiliRelay
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


