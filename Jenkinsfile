pipeline {
    agent any

    environment {
        registry = "796188858450.dkr.ecr.us-east-2.amazonaws.com"
        repository = "frontend"
        registryCredential = 'AWS'
        dockerImage = ''
    }

    stages {
        stage ('Build') {
            steps {
                script {
                    dockerImage = docker.build repository + ":latest"
                }
            }
        }
        stage ('Deploy') {
            steps {
                script {
                    sh "aws ecr get-login-password --region us-east-2 | docker login --username AWS --password-stdin " + registry
                    docker.withRegistry("https://" + registry) {
                        dockerImage.push()
                    }
                }
            }
        }
        stage ('Update') {
            steps {
                script {
                    sh "aws ecs update-service --cluster cluster-1 --service common --force-new-deployment --region us-east-2"
                }
            }
        }
    }
}