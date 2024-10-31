package handlers

import (
	"fmt"

	ekili "github.com/tacherasasi/go-react/ekilirelay"
)

func LogError(title,desc,statusCode,location string  ){
	relay := ekili.NewEkiliRelay("relay-6087f8c42d70f0650b9f023adc")
	descMessage := desc + "Status code " + statusCode
    
	//sending the email with ekilirelay
    response, err := relay.SendEmail(
        "support@ekilie.com",
        title,
        descMessage,
        "From: Go React <tacherasasi@gmail.com>", 
    )
    
    if err != nil {
        fmt.Printf("Error sending email: %v\n", err)
        return
    }
    
    fmt.Printf("Email sent: %s - %s\n", response.Status, response.Message)
}