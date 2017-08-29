import React, { Component } from 'react';
import Result from './components/Result';
import Search from './components/Search';
import ResultStore from './stores/ResultStore';
import './App.css';

class App extends Component {

  constructor(props){
    super(props)
    this.state = ResultStore.getState();
  }

  updateState(data){
    //console.log(this.state.results);
    this.state.results.push(data.data);
  }
  render() {
    return (
      <div className="container">
        <Search callUpdateState={this.updateState.bind(this)}/>
        <Result resultData={this.state.results}/>
      </div>

    );
  }
}

export default App;
