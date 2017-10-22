import React, { Component } from 'react';
import './App.css';
import $ from 'jquery';
import './assets/css/theme-wso2.min.css';
import './assets/js/theme-wso2.min.js';


class App extends Component {

  show(){
    $("#name").hide();
    //$("#load").loading('show');
    $("#load").hide();
  }

  render() {
    return (
      <div className="App">
        
        <h2 id="name">Hello</h2>
        <div id="load" style={{"height":"200px"}} data-toggle="loading" data-loading-inverse="true">name</div>
        <button onClick={this.show.bind(this)}>click</button>
      </div>
    );
  }
}

export default App;
