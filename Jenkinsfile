pipeline {
  agent any

  environment {
    IMAGE_NAME = 'devops-demo'
  }

  stages {

    stage('Clone repo') {
      steps {
        checkout scm
      }
    }

    stage('Cleanup') {
      steps {
        sh """
          set +e
          if [ -f .container_id ]; then
            docker rm -f "\$(cat .container_id)"
            rm -f .container_id
          fi
          docker image inspect "${env.IMAGE_NAME}" >/dev/null 2>&1 && docker rmi "${env.IMAGE_NAME}" || true
        """
      }
    }

    stage('Build Docker image') {
      steps {
        sh "docker build -t ${env.IMAGE_NAME} ."
      }
    }

    stage('Run container') {
      steps {
        sh "docker run -d -p 127.0.0.1::5000 ${env.IMAGE_NAME} | tail -1 > .container_id"
      }
    }

    stage('Verify App') {
      steps {
        sh '''
          CID="$(cat .container_id)"
          PORT="$(docker port "$CID" 5000/tcp | grep -m1 '127.0.0.1:' | awk -F: '{print $2}')"
          if [ -z "$PORT" ]; then
            echo "ERROR: could not determine host port for container $CID" >&2
            exit 1
          fi
          curl -f \
               --retry 10 \
               --retry-delay 3 \
               --retry-connrefused \
               "http://127.0.0.1:${PORT}/health"
        '''
      }
    }
  }

  post {
    always {
      sh '''
        if [ -f .container_id ]; then
          docker rm -f "$(cat .container_id)" || true
          rm -f .container_id || true
        fi
      '''
    }
  }
}