pipeline {

    agent any

    stages {

        stage('Checkout') {
            steps {
                echo 'Checking out application from GitHub...'
                checkout scm
            }
        }

        stage('Verify Files') {
            steps {
                sh '''
                    echo "Checking application files..."
                    ls -la
                    echo "Frontend:"
                    ls -la frontend
                    echo "Backend:"
                    ls -la backend
                '''
            }
        }

        stage('Deploy Application') {
            steps {
                sh '''
                    echo "Starting deployment..."
                    sudo /usr/local/bin/deploy-employee-app "$WORKSPACE"
                '''
            }
        }

        stage('Verify Deployment') {
            steps {
                sh '''
                    echo "Checking backend..."
                    curl -f http://127.0.0.1:5000/
                    echo
                    echo "Deployment completed successfully."
                '''
            }
        }
    }

    post {
        success {
            echo 'Employee Management application deployed successfully.'
        }

        failure {
            echo 'Deployment failed. Check the Jenkins console output.'
        }
    }
}