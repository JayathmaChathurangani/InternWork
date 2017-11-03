/**
 * Copyright (c) 2017, WSO2 Inc. (http://www.wso2.org) All Rights Reserved.
 *
 * WSO2 Inc. licenses this file to you under the Apache License,
 * Version 2.0 (the "License"); you may not use this file except
 * in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import React, { Component } from 'react';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import Root from './scenes/Root';
import Main from './scenes/Main';
import RequestRepository from './scenes/repository/RequestRepository';
import AcceptRepository from './scenes/repository/AcceptRepository';
import RejectRepository from './scenes/repository/RejectRepository';
import SearchRepository from './scenes/repository/SearchRepository';
import PendingRequests from './scenes/common/PendingRequests';
import WaitingRequests from './scenes/common/WaitingRequests';

/**
 * @class App
 * @extends {Component}
 * @description Sample React component
 */
class App extends Component {
    /**
     *
     * @returns {object} App view
     * @memberof App
     */
    render() {
        return (
            <Router history={hashHistory}>
                <Route path={'/root'} component={Root} >
                    <IndexRoute component={RequestRepository} />
                    <Route path={'pendingRequests'} component={PendingRequests} />
                    <Route path={'waitingRequests'} component={WaitingRequests} />
                    <Route path={'acceptRepository'} component={AcceptRepository} />
                    <Route path={'rejectRepository'} component={RejectRepository} />
                    <Route path={'searchRepository'} component={SearchRepository} />
                    <Route path={'requestRepository'} component={RequestRepository} />
                </Route>
                <Route path={'/'} component={Main} />
            </Router>
        );
    }
}

export default App;
