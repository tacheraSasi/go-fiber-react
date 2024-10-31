package middlewares

import (
	"net/http"

	"github.com/golang-jwt/jwt/v4"
	"github.com/tacherasasi/go-react/handlers"
)

func AuthMiddleware(next http.Handler) http.Handler {
    return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
        cookie, err := r.Cookie("token")
        if err != nil {
            http.Error(w, "Forbidden", http.StatusForbidden)
            return
        }

        claims := &handlers.Claims{}
        token, err := jwt.ParseWithClaims(cookie.Value, claims, func(token *jwt.Token) (interface{}, error) {
            return handlers.JwtKey, nil
        })

        if err != nil || !token.Valid {
            http.Error(w, "Forbidden", http.StatusForbidden)
            return
        }

        next.ServeHTTP(w, r)
    })
}
