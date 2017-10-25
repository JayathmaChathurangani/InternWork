import {Component} from 'react';

class MainData extends Component{

  constructor(){
    super();
    this.ballerinaDatabaseURL = "https://localhost:9090/databaseService/";
    this.ballerinaMailURL = "http://localhost:9090/mailService/";
    this.ballerinaGitHubURL = "http://localhost:9090/";
    this.ballerinaURL = "http://localhost:9090/";
    this.bpmnStartURL = "https://admin:admin@localhost:9445/bpmn/runtime/process-instances/";
    this.bpmnImgURL = "https://localhost:9445/bpmn/runtime/process-instances/";
    this.bpmnTaskUrl = "https://admin:admin@localhost:9445/bpmn/runtime/tasks/";
    //this.bpmnStartURL = "https://api.github.com/gitignore/templates";
  }
}

export default (new MainData());
