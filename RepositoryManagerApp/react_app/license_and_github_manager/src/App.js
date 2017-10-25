import React, { Component } from 'react';
import {Router, Route, browserHistory, IndexRoute} from 'react-router';
import Root from './scenes/Root';
import Main from './scenes/Main';
import './App.css';
import RequestRepository from './scenes/repository/RequestRepository';
import AcceptRepository from './scenes/repository/AcceptRepository';
import RejectRepository from './scenes/repository/RejectRepository';
import SearchRepository from './scenes/repository/SearchRepository';
import PendingRequests from './scenes/common/PendingRequests';
import WaitingRequests from './scenes/common/WaitingRequests';
import LoginError from './scenes/common/LoginError';
import RequestComponent from './scenes/component/RequestComponent';
import ShowComponent from './scenes/component/ShowComponent';


class App extends Component {


  render() {
    return (
      <Router history={browserHistory}>
        <Route path={"/"} component={Root}>

          {/* Index route for Root */}
          <IndexRoute component={RequestRepository} />

          {/* PendingRequests routes start */}
          <Route path={"pendingRequests"} component={PendingRequests}></Route>
          <Route path={"waitingRequests"} component={WaitingRequests}></Route>
          {/* PendingRequests routes ends */}

          {/* Request routes start */}
          <Route path={"requestRepository"} component={RequestRepository}></Route>
          <Route path={"acceptRepository"} component={AcceptRepository}></Route>
          <Route path={"rejectRepository"} component={RejectRepository} ></Route>
          <Route path={"searchRepository"} component={SearchRepository} ></Route>

          {/* Request routes ends */}

          {/* Component routes start */}
          <Route path={"requestComponent"} component={RequestComponent}></Route>
          <Route path={"showComponent"} component={ShowComponent}></Route>
          {/* Component routes ends */}



        </Route>

        <Route path={"/main"} component={Main}></Route>
        <Route path={"/loginError"} component={LoginError}></Route>
      </Router>
    );
  }
}

export default App;
