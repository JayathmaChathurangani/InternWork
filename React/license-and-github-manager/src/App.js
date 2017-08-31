import React, { Component } from 'react';
import {Router, Route, browserHistory, IndexRoute} from 'react-router';
import Root from './scenes/Root';
import Main from './scenes/Main';
import RequestComponent from './scenes/component/RequestComponent';
import ShowComponent from './scenes/component/ShowComponent';


import './App.css';
class App extends Component {

  render() {
    return (
      <Router history={browserHistory}>
        <Route path={"/root"} component={Root}>
          <IndexRoute component={RequestComponent} />
          <Route path={"requestComponent"} component={RequestComponent}></Route>
          <Route path={"showComponent"} component={ShowComponent}></Route>
        </Route>

        <Route path={"/"} component={Main}>

        </Route>
      </Router>


    );
  }
}

export default App;
