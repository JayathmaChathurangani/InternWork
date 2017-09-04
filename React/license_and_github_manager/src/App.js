import React, { Component } from 'react';
import {Router, Route, browserHistory, IndexRoute} from 'react-router';
import Root from './scenes/Root';
import Main from './scenes/Main';

import RequestRepository from './scenes/repository/RequestRepository';

import RequestComponent from './scenes/component/RequestComponent';
import ShowComponent from './scenes/component/ShowComponent';

class App extends Component {
  render() {
    return (
      <Router history={browserHistory}>
        <Route path={"/root"} component={Root}>

          {/* Index route for Root */}
          <IndexRoute component={RequestComponent} />

          {/* Request routes start */}
          <Route path={"requestRepository"} component={RequestRepository}></Route>

          {/* Request routes ends */}

          {/* Component routes start */}
          <Route path={"requestComponent"} component={RequestComponent}></Route>
          <Route path={"showComponent"} component={ShowComponent}></Route>
          {/* Component routes ends */}



        </Route>

        <Route path={"/"} component={Main}>

        </Route>
      </Router>
    );
  }
}

export default App;
