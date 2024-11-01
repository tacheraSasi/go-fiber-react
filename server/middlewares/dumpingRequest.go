package middlewares

import (
    "bytes"
    "io"
    "log"
    "net/http"
    "net/http/httputil"
)

// LogRequestMiddleware dumps the full HTTP request and restores the body
func LogRequestMiddleware(next http.Handler) http.Handler {
    return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
        // Dump the request including the body
        var bodyBytes []byte
        if r.Body != nil {
            bodyBytes, _ = io.ReadAll(r.Body)
        }

        requestDump, err := httputil.DumpRequest(r, false) // Dump without body first
        if err != nil {
            log.Printf("Error dumping request: %v", err)
            http.Error(w, "Internal Server Error", http.StatusInternalServerError)
            return
        }

        // Log the request details and body separately
        log.Println("Request Dump:\n", string(requestDump))
        log.Println("Request Body:\n", string(bodyBytes))

        // Restore the original request body
        r.Body = io.NopCloser(bytes.NewBuffer(bodyBytes))

        // Continue to the next handler
        next.ServeHTTP(w, r)
    })
}
