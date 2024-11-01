package utils

import (
    "time"
    "github.com/golang-jwt/jwt/v5"
)

var jwtKey = []byte("my_secret_key")

type Claims struct {
    Email string `json:"email"`
    jwt.RegisteredClaims
}

// GenerateJWT generates a JWT token
func GenerateJWT(email string) (string, error) {
    expirationTime := time.Now().Add(1 * time.Hour)
    claims := &Claims{
        Email: email,
        RegisteredClaims: jwt.RegisteredClaims{
            ExpiresAt: jwt.NewNumericDate(expirationTime),
        },
    }

    token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
    return token.SignedString(jwtKey)
}

// ValidateJWT validates a JWT token and returns the claims
func ValidateJWT(tokenStr string) (*Claims, error) {
    claims := &Claims{}
    token, err := jwt.ParseWithClaims(tokenStr, claims, func(token *jwt.Token) (interface{}, error) {
        return jwtKey, nil
    })
    if err != nil || !token.Valid {
        return nil, err
    }
    return claims, nil
}
