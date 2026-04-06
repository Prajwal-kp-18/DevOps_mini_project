pipeline {
  agent any

  environment {
    IMAGE_NAME = 'devops-demo'
    CONTAINER_NAME = 'devops-demo-container'
  }

  stages {

    stage('Clone repo') {
      steps {
        checkout scm
      }
    }

    stage('Cleanup') {
      steps {
        sh '''
        set -e
        if docker ps -a --format '{{.Names}}' | grep -Fxq "${CONTAINER_NAME}"; then
          docker rm -f "${CONTAINER_NAME}"
        fi
        docker image inspect "${IMAGE_NAME}" >/dev/null 2>&1 && docker rmi "${IMAGE_NAME}" || true
        '''
      }
    }

    stage('Install dependencies') {
      steps {
        sh '''
        cd backend
        npm ci
        '''
      }
    }

    stage('Build Docker image') {
      steps {
        sh 'docker build -t ${IMAGE_NAME} .'
      }
    }

    stage('Run container') {
      steps {
        sh 'docker run -d --name ${CONTAINER_NAME} -p 5000:5000 ${IMAGE_NAME}'
      }
    }

    stage('Verify App') {
      steps {
        sh 'sleep 5'
        sh 'curl -f http://localhost:5000/health || exit 1'
      }
    }
  }
}