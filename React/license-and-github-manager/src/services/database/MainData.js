import {Component} from 'react';

class MainData extends Component{

  constructor(){
    super();
    this.ballerinaDatabaseURL = "http://localhost:9090/databaseService/";
  }

  sayHello(){
    console.log("hello b");
  }
}

export default (new MainData());
