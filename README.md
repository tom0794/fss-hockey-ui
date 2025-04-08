# fss-hockey-ui
A frontend for Fantasy Sports Simulator: Hockey.

## Container notes
- Start backend container with `FRONTEND_URL` if different than default `http://host.docker.internal:8082` or `http://localhost:8082`
- Start frontend container with env var `BACKEND_URL` set to `http://host.docker.internal:8080` (or whatever port backend container is running on)
