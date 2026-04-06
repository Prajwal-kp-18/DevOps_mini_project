# DevOps Project

## Ports

- Backend API: **5000**
- Frontend (Nginx via Docker Compose): **8081**

## Run Locally

1. Start backend:
   - `cd backend`
   - `npm install`
   - `npm start`
2. Open frontend:
   - Open `frontend/index.html` in a browser.

## Run with Docker

From project root:

1. Build backend image:
   - `docker build -t devops-demo .`
2. Run backend container:
   - `docker run -p 5000:5000 devops-demo`

## Run with Docker Compose

From project root:

- `docker compose up --build`

Access:

- Frontend: `http://localhost:8081`
- Backend health: `http://localhost:8081/health`
- Backend submit: `http://localhost:8081/submit`

## Jenkins Instructions

1. Create a new **Pipeline** job.
2. Configure:
   - Definition: `Pipeline script from SCM`
   - SCM: `Git`
   - Script Path: `Jenkinsfile`
3. Save and click **Build Now**.
4. Check **Stage View** and **Console Output** for stage progress.
