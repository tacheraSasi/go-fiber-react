// package middlewares

// import (
// 	"net/http"

// 	"github.com/golang-jwt/jwt/v5"
// )

// func authMiddleware(next http.Handler) http.Handler {
//     return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
//         cookie, err := r.Cookie("token")
//         if err != nil {
//             http.Error(w, "Forbidden", http.StatusForbidden)
//             return
//         }

//         claims := &Claims{}
//         token, err := jwt.ParseWithClaims(cookie.Value, claims, func(token *jwt.Token) (interface{}, error) {
//             return jwtKey, nil
//         })

//         if err != nil || !token.Valid {
//             http.Error(w, "Forbidden", http.StatusForbidden)
//             return
//         }

//         next.ServeHTTP(w, r)
//     })
// }
