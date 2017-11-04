import { Component } from 'react';
import axios from 'axios';
import MainData from '../MainData';

/**
* @class GitHubRepositoryTask
* @extends {Component}
* @description GitHubRepositoryTask
*/
class GitHubRepositoryCreation extends Component {
    /**
    * escape charachters
    * @param {String} requestData requestData
    * @param {String} mailData mailData
    * @param {String} mainUsers mainUsers
    * @returns {String} str
    */
    startProcess(requestData, mailData, mainUsers) {
        const url = MainData.bpmnStartURL;
        const columns = [
            'REPOSITORY_NAME',
            'REPOSITORY_LANGUAGE',
            'REPOSITORY_BUILDABLE',
            'REPOSITORY_NEXUS',
            'REPOSITORY_PRIVATE',
            'REPOSITORY_DESCRIPTION',
            'REPOSITORY_GROUPID',
            'REPOSITORY_LICENSE',
            'REPOSITORY_TEAM',
            'REPOSITORY_ORGANIZATION',
            'REPOSITORY_TYPE',
            'REPOSITORY_REQUEST_BY',
        ];
        const mailColumns = [
            'Repository Name',
            'Language',
            'Buildable',
            'Nexus repository',
            'Is private',
            'Description',
            'Group ID',
            'License',
            'Team',
            'Organization',
            'Type',
            'Requested By',
        ];
        const tableName = 'LM_REPOSITORY';
        let i = 0;
        let sendToList = ' ';
        for (i = 0; i < mainUsers.length; i++) {
            sendToList = sendToList + mainUsers[i].USER_EMAIL + ',';
        }
        const variablesArray = [
            {
                name: 'tableName',
                value: tableName,
            },
            {
                name: 'columns',
                value: columns,
            },
            {
                name: 'mailColumns',
                value: mailColumns,
            },
            {
                name: 'data',
                value: requestData,
            },
            {
                name: 'mailData',
                value: mailData,
            },
            {
                name: 'sendToList',
                value: sendToList,
            },
        ];
        const data = {
            processDefinitionKey: 'repositoryCreationProcess',
            businessKey: 'myBusinessKey',
            tenantId: '-1234',
            variables: variablesArray,
        };
        const headers = {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
        };
        return axios.post(url, data, headers).then((response) => {
            return response;
        }).catch((error) => {
            throw new Error(error);
        });
    }
    /**
    * completeUserTask
    * @param {String} bpmnTaskId bpmnTaskId
    * @param {String} variablesArray variablesArray
    * @returns {Promise} promise
    */
    completeUserTask(bpmnTaskId, variablesArray) {
        const url = MainData.bpmnTaskUrl + bpmnTaskId;
        const data = {
            action: 'complete',
            variables: variablesArray,
        };
        const headers = {
            'Content-Type': 'application/json',
        };
        return axios.post(url, data, headers).then((response) => {
            return (response);
        }).catch((error) => {
            throw new Error(error);
        });
    }
    /**
    * acceptUserTask
    * @param {String} bpmnTaskId bpmnTaskId
    * @param {String} repoId repositoryId
    * @returns {Promise} promise
    */
    acceptUserTask(bpmnTaskId, repoId) {
        const url = MainData.ballerinaURL + 'bpmn/acceptRepository';
        const data = {
            taskId: bpmnTaskId,
            repositoryId: repoId,
        };
        const headers = {
            'Content-Type': 'application/json',
        };
        return axios.post(url, data, headers).then((response) => {
            return (response);
        }).catch((error) => {
            throw new Error(error);
        });
    }
}

export default (new GitHubRepositoryCreation());
