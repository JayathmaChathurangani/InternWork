import {Component} from 'react';
import axios from 'axios';
import MainData from '../MainData';

class GitHubRepositoryCreation extends Component{

    startProcess(requestData){
        var url = MainData.bpmnStartURL;
        var columns = [
            'REPOSITORY_NAME',
            'REPOSITORY_LANGUAGE',
            'REPOSITORY_BUILDABLE',
            'REPOSITORY_PRIVATE',
            'REPOSITORY_DESCRIPTION',
            'REPOSITORY_GROUPID',
            'REPOSITORY_LICENSE',
            'REPOSITORY_TEAM',
            'REPOSITORY_ORGANIZATION',
            'REPOSITORY_TYPE',
            'REPOSITORY_REQUEST_BY'
        ];

        var mailColumns = [
            'Repository Name',
            'Language',
            'Buildable',
            'Is private',
            'Description',
            'Group ID',
            'License',
            'Team',
            'Organization',
            'Type',
            'Requested By'
        ];
        var tableName = "LM_REPOSITORY";
        var variables = [
            {
                "name":"tableName",
                "value":tableName
            },
            {
                "name":"columns",
                "value":columns
            },
            {
                "name":"mailColumns",
                "value":mailColumns
            },
            {
                "name":"data",
                "value":requestData
            }
        ];

        var data = {
            "processDefinitionKey":"helloworld",
            "businessKey":"myBusinessKey",
            "tenantId": "-1234",
            "variables":variables
        };

        var headers = {
            'Content-Type':'application/json'
        };
        return axios.post(
            url,
            data,
            headers
        )
        .then(function (response) {
            
           console.log(response) ;
            
        })
        .catch(function (error) {
            console.log(error);
        });
    }
    
}


export default (new GitHubRepositoryCreation());