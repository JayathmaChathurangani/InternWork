import {Component} from 'react';
import axios from 'axios';
import MainData from '../MainData';
import Mail from '../mail/Mail';

class LM_REPOSITORY extends Component{
    
    /* insert into repository table */
    insertData(data){
        var url = MainData.ballerinaDatabaseURL + "repository/insertData";
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
        var requestData = {"tableName":"LM_REPOSITORY","columns":columns,"data":data};
        var headersData = {headers:{'Access-Control-Allow-Origin':"*"}};
        return axios.post(
            url,
            requestData,
            headersData
        )
        .then(function (response) {
            
            if(response.data.type !== "Error"){
                Mail.sendMail(data);
            }else{
                alert(" Your request sending fails.");
            }
            
        })
        .catch(function (error) {
            console.log(error);
        });
    }
    /*  insert into repository table ends*/

    /* update repository table */
    updateTaskAndProcessIds(data){
        var url = MainData.ballerinaDatabaseURL + "repository/updateBpmnAndTaskIds";
        var requestData = {"data":data};
        var headersData = {headers:{'Access-Control-Allow-Origin':"*"}};
        return axios.post(
            url,
            requestData,
            headersData
        )
        .then(function (response) {
            
            if(response.data.type === "Error"){
                console.log(" Your BPMN error occur " + response.data.message);
            }
            
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    updateRejectDetails(data){
        var url = MainData.ballerinaDatabaseURL + "repository/updateRejectDetails";
        var requestData = {"data":data};
        var headersData = {headers:{'Access-Control-Allow-Origin':"*"}};
        return axios.post(
            url,
            requestData,
            headersData
        )
        .then(function (response) {
            
            if(response.data.type === "Error"){
                console.log(" Your BPMN error occur " + response.data.message);
            }
            
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    updateAll(data,repoId){
        var url = MainData.ballerinaDatabaseURL + "repository/updateAll";
        var requestData = {"data":data,"repoId":repoId};
        var headersData = {headers:{'Access-Control-Allow-Origin':"*"}};
        return axios.post(
            url,
            requestData,
            headersData
        )
        .then(function (response) {
            
            if(response.data.type === "Error"){
                console.log(" Your BPMN error occur " + response.data.message);
            }
            
        })
        .catch(function (error) {
            console.log(error);
        });
    }
    /* update repository table ends*/

    selectDataFromName(data){
        var url = MainData.ballerinaDatabaseURL + "repository/selectFromName?name=" + data;
        var headersData = {headers:{'Access-Control-Allow-Origin':"*"}};
        return axios.get(
            url,
            headersData
        )
        .then(function (response) {
            
            return(response.data) ;
            
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    selectDataFromRequestBy(data){
        var url = MainData.ballerinaDatabaseURL + "repository/selectFromRequestByAndWaiting?requestBy=" + data;
        var headersData = {headers:{'Access-Control-Allow-Origin':"*"}};
        return axios.get(
            url,
            headersData
            
        )
        .then(function (response) {
            
            return(response.data) ;
            
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    selectDataFromId(data){
        var url = MainData.ballerinaDatabaseURL + "repository/selectFromId?id=" + data;
        
        return axios.get(
            url
        )
        .then(function (response) {
            
            return(response.data) ;
            
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    selectWaitingRequests(){
        var url = MainData.ballerinaDatabaseURL + "repository/selectWaitingRequests" ;
        
        return axios.get(
            url
        )
        .then(function (response) {
            
            return(response.data) ;
            
        })
        .catch(function (error) {
            console.log(error);
        });
    }
}


export default (new LM_REPOSITORY());