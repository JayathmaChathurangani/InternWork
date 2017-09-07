import {Component} from 'react';

class MainData extends Component{

  constructor(){
    super();
    this.ballerinaDatabaseURL = "http://localhost:9090/databaseService/";
    this.ballerinaMailURL = "http://localhost:9090/mailService/";
    this.ballerinaGitHubURL = "http://localhost:9090/gitHubService/";
  }
}

export default (new MainData());
