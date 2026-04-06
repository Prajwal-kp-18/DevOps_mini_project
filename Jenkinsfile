pipeline {
  agent any

  environment {
    IMAGE_NAME = 'devops-demo'
    CONTAINER_NAME = 'devops-demo-container'
    // Optional: set DOCKERHUB_REPO like 'yourdockerhub/devops-demo' in Jenkins env
    // Optional: set DOCKERHUB_CREDENTIALS as Jenkins credentials ID
  }

  stages {
    stage('Clone repo') {
      steps {
        checkout scm
      }
    }

    stage('Install dependencies') {
      steps {
        sh 'cd backend && npm ci'
      }
    }

    stage('Build Docker image') {
      steps {
        sh 'docker build -t ${IMAGE_NAME} .'
      }
    }

    stage('Push to Docker Hub (Optional)') {
      when {
        expression { return env.DOCKERHUB_REPO?.trim() }
      }
      steps {
        script {
          sh 'docker tag ${IMAGE_NAME} ${DOCKERHUB_REPO}:latest'
          if (env.DOCKERHUB_CREDENTIALS?.trim()) {
            withCredentials([usernamePassword(credentialsId: env.DOCKERHUB_CREDENTIALS, usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
              sh 'echo "$DOCKER_PASS" | docker login -u "$DOCKER_USER" --password-stdin'
            }
          }
          sh 'docker push ${DOCKERHUB_REPO}:latest'
        }
      }
    }

    stage('Run container') {
      steps {
        sh 'docker rm -f ${CONTAINER_NAME} || true'
        sh 'docker run -d --name ${CONTAINER_NAME} -p 5000:5000 ${IMAGE_NAME}'
      }
    }
  }
}
