package courses

import (
	"log"
	http "net/http"
	"time"
)

//Logger Logger decorator for APIs
func Logger(inner http.Handler, name string) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		start := time.Now()

		inner.ServeHTTP(w, r)
		if r.RequestURI == "/ping" {
			// skipping the logs for ping as load balancer will hit it continously, which will cluter the logs
			return
		}
		log.Printf(
			"%s %s %s %s",
			r.Method,
			r.RequestURI,
			name,
			time.Since(start),
		)
	})
}
