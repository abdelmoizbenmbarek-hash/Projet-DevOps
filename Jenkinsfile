pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/abdelmoizbenmbarek-hash/Projet-DevOps.git'
            }
        }

        stage('Read Repo') {
            steps {
                sh 'ls -la'
                sh 'cat README.md'
            }
        }
        stage('SonarQube Analysis') {
            steps {
                withSonarQubeEnv('SonarQube') {
                    sh '''
                        sonar-scanner -Dsonar.projectKey=Projet-DevOps -Dsonar.projectName=Projet-DevOps -Dsonar.sources=. -Dsonar.host.url=http://sonarqube:9000
                    '''
                }
            }
        }

        stage('Quality Gate') {
            steps {
                timeout(time: 2, unit: 'MINUTES') {
                    waitForQualityGate abortPipeline: true
                }
            }
        }
        stage('Build Frontend Image') {
            steps { sh 'docker build -t frontendjenkins:latest ./frontend/my-angular-app' 
            }
        }
        stage('Build Backend Image') {
            steps { sh 'docker build -t backendjenkins:latest ./backend' 
            }
        }
        stage('Build database Image') {
            steps { sh 'docker build -t databasejenkins:latest ./backend/DataBase' 
            }
        }
    }

    post {
        success {
            echo 'Pipeline completed successfully!'
        }
        failure {
            echo 'Pipeline failed!'
        }
    }
}