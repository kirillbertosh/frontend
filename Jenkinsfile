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
                    sh '''
                            aws ecs register-task-definition --cli-input-json file://task-definition.json --region us-east-2
                            TASK_REVISION=`aws ecs describe-task-definition --task-definition terraform-task-definition --region us-east-2 | egrep "revision" | tr "/" " " | awk '{print $2}' | sed 's/"$//'`
                            aws ecs update-service --cluster terraform-cluster --service terraform-service --task-definition terraform-task-definition:$TASK_REVISION --region us-east-2
                            aws ecs wait services-stable --service terraform-service --cluster terraform-cluster --region us-east-2
                       '''
                }
            }
        }
    }
}