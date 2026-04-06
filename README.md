# DevOps Mini Project (5-Minute Demo)

A minimal full-stack demo for DevOps evaluation.

## Project Structure

- frontend/ -> static HTML, CSS, JS
- backend/ -> Node.js Express API
- Dockerfile -> backend Docker image
- docker-compose.yml -> run frontend + backend together
- Jenkinsfile -> CI/CD pipeline

## 1) Application

### Backend
- Runs on port **5000**
- Endpoint: `POST /submit`
- Logs incoming form data and returns success JSON

### Frontend
- Simple form with **name** and **message**
- Uses `fetch()` to call backend API
- Displays success response on UI

## 2) Run Locally (without Docker)

### Start backend
1. Open terminal in project root
2. Run:
   - `cd backend`
   - `npm install`
   - `npm start`
3. Backend runs on: http://localhost:5000

### Open frontend
- Open `frontend/index.html` in browser (or serve frontend folder with any static server).
- Submit the form and see success message.

## 3) Run with Docker (required commands)

From project root:

1. Build image
   - `docker build -t devops-demo .`
2. Run container
   - `docker run -p 5000:5000 devops-demo`
3. List images
   - `docker images`

Backend API will be available at: http://localhost:5000

## 4) Run with Docker Compose (preferred)

From project root:

- `docker compose up --build`

Access:
- Frontend: http://localhost:8081
- Backend (via frontend proxy): `/submit` and `/health`

Notes:
- In compose mode, backend is internal-only and exposed through Nginx proxy.
- If you previously ran older containers and get `permission denied` while stopping them, keep using the new compose services (`api`, `web`) or remove old locked containers with elevated Docker privileges.

## 5) Jenkins Pipeline Explanation

`Jenkinsfile` stages:

1. **Clone repo**
   - Uses Jenkins SCM checkout.
2. **Install dependencies**
   - Runs `npm ci` inside `backend/`.
3. **Build Docker image**
   - Builds image named `devops-demo`.
4. **Push to Docker Hub (Optional)**
   - Runs only if `DOCKERHUB_REPO` is set.
   - Uses optional credentials if `DOCKERHUB_CREDENTIALS` is provided.
5. **Run container**
   - Replaces existing container and runs app on port 5000.

## Quick Demo Flow (Under 5 Minutes)

1. `docker build -t devops-demo .`
2. `docker run -p 5000:5000 devops-demo`
3. Open frontend (or use docker compose for frontend on port 8080)
4. Submit form and show success response
5. Show Jenkins stages in Jenkins UI
