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
                    sh "aws ecs register-task-definition --cli-input-json file://task-definition.json --region us-east-2"
                    sh "TASK_REVISION=$(aws ecs describe-task-definition --task-definition common --region us-east-2 | egrep \"revision\" | tr \"/\" \" \" | awk '{print $2}' | sed 's/\"$//')"
                    sh "aws ecs update-service --cluster cluster-1 --service common --force-new-deployment --task-definition common:$TASK_REVISION --region us-east-2"
                }
            }
        }
    }
}