import {EventEmitter} from "events";


class ResultStore extends EventEmitter{
  constructor(){
    super();
    this.state = {
      results: [
      {'firstName':"buddhi",'lastName':"wathsala"},
      {'firstName':"namal",'lastName':"wathsala"}]
    }
  }

  getState(){
    return this.state;
  }

  createState(firstName,lastName){
    //console.log();
    this.state.results.push({'firstName':firstName,'lastName':lastName});
  }

}

const resultStore = new ResultStore;
window.resultStore = resultStore;
export default resultStore;
