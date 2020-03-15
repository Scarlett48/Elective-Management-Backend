pipeline {
  agent any
  tools {nodejs "node"}
  environment {CI='true'}
  
  stages {
     stage('SonarQube Analysis') {
     
    steps{script{
      
      env.home = tool name: 'Sonar_Qube', type: 'hudson.plugins.sonar.SonarRunnerInstallation';

     withSonarQubeEnv(credentialsId: 'sonarqube-secret',installationName:'sonarqube') {
    
       
      sh "${home}/bin/sonar-scanner   -D sonar.host.url=http://electivemanagement.eastus.cloudapp.azure.com:9000  -D sonar.login=admin -D sonar.password=admin"};
    }}

}
    stage('Install dependencies'){
      steps{
      sh 'npm install'
      
      }
    }
  
        

   
    stage("test"){steps {sh 'npm test'}}
        stage('Build') { 
            steps {
                
                sh 'npm build'
            }
        }
    }

}
