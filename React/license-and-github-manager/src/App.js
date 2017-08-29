import React, { Component } from 'react';
import {Router, Route, browserHistory, IndexRoute} from 'react-router';
import Root from './scenes/Root';
import RequestComponent from './scenes/component/RequestComponent';
import ShowComponent from './scenes/component/ShowComponent';


import './App.css';
class App extends Component {

  render() {
    return (
      <Router history={browserHistory}>
        <Route path={"/"} component={Root}>
          <IndexRoute component={RequestComponent} />
          <Route path={"requestComponent"} component={RequestComponent}></Route>
          <Route path={"showComponent"} component={ShowComponent}></Route>
        </Route>
      </Router>


    );
  }
}

export default App;
