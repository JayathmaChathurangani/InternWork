import { Component } from 'react';
import axios from 'axios';
import MainData from '../MainData';

/**
* @class GitHubRepositoryTask
* @extends {Component}
* @description GitHubRepositoryTask
*/
class LibraryProcess extends Component {
    /**
    * escape charachters
    * @param {String} requestData requestData
    * @param {String} mainUsers mainUsers
    * @returns {String} str
    */
    startProcess(requestData, mainUsers) {
        const url = MainData.bpmnStartURL;
        let i = 0;
        let sendToList = ' ';
        for (i = 0; i < mainUsers.length; i++) {
            sendToList = sendToList + mainUsers[i].ROLE_EMAIL + ',';
        }
        const variablesArray = [
            {
                name: 'data',
                value: requestData,
            },
            {
                name: 'sendToList',
                value: sendToList,
            },
        ];
        const data = {
            processDefinitionKey: '',
            businessKey: 'myBusinessKey',
            tenantId: '-1234',
            variables: variablesArray,
        };
        const headers = {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
        };
        console.log(data);//eslint-disable-line
        return axios.post(url, data, headers).then((response) => {
            return response;
        }).catch((error) => {
            throw new Error(error);
        });
    }
}

export default (new LibraryProcess());
