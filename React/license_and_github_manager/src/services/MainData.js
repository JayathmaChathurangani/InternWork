import {Component} from 'react';

class MainData extends Component{

  constructor(){
    super();
    this.ballerinaDatabaseURL = "http://localhost:9090/databaseService/";
    this.ballerinaMailURL = "http://localhost:9090/mailService/";
    this.ballerinaGitHubURL = "http://localhost:9090/gitHubService/";
    this.bpmnStartURL = "https://admin:admin@192.168.8.100:9445/bpmn/runtime/process-instances";
    //this.bpmnStartURL = "https://api.github.com/gitignore/templates";
  }
}

export default (new MainData());
