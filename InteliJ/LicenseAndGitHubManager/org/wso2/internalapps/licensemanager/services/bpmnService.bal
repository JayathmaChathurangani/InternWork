package org.wso2.internalapps.licensemanager.services;

import ballerina.net.http;
import org.wso2.internalapps.licensemanager.conf;
import ballerina.lang.messages;
import ballerina.lang.system;
import ballerina.lang.errors;
import org.wso2.internalapps.licensemanager.database;
import ballerina.lang.jsons;

http:ClientConnector httpConnectorBpmn;
string bpmnStartUrl = conf:getConfigData("bpmnStartUrl");
string bpmnBasicAuthToken = conf:getConfigData("bpmnBasicAuthToken");

function setBpmnConnection(){
    system:println(bpmnStartUrl);
    httpConnectorBpmn = create http:ClientConnector(bpmnStartUrl);


}

function bpmnRequestRepository(json requestData,json mailData)(json){
    message requestMessage = {};
    message responseFromBpmn = {};
    json requestPayloadJson;
    json responseFromBpmnJson;
    json repositoryMainUsers;
    json variables;
    json response;
    string url;
    string sendToList = " ";
    string repositoryName;
    int taskId;
    int processInstanceId;
    int i = 0;
    int repositoryMainUsersJsonLength;
    int databaseUpdateReturnValue;
    boolean completed = true;

    try{
        if(httpConnectorBpmn == null){
            setBpmnConnection();
        }
        repositoryMainUsers = database:roleSelectRepositoryMainUsers();
        repositoryMainUsersJsonLength = lengthof repositoryMainUsers;
        while(i < repositoryMainUsersJsonLength){
            sendToList = sendToList + jsons:toString(repositoryMainUsers[i].ROLE_EMAIL) + ", ";
            i = i + 1;
        }
        system:println(sendToList);
        url = "bpmn/runtime/process-instances/";
        variables = [
                        {"name": "data","value":requestData},
                        {"name": "mailData","value":mailData},
                        {"name": "sendToList","value":sendToList}
                    ];
        messages:setHeader(requestMessage,"Authorization",bpmnBasicAuthToken);
        requestPayloadJson = {
                                 "processDefinitionKey": "repositoryCreationProcess",
                                 "businessKey": "myBusinessKey",
                                 "tenantId": "-1234",
                                 "variables":variables
                             };
        messages:setJsonPayload(requestMessage,requestPayloadJson);
        responseFromBpmn = http:ClientConnector.post(httpConnectorBpmn,url,requestMessage);
        responseFromBpmnJson = messages:getJsonPayload(responseFromBpmn);
        completed, _ = <boolean> jsons:toString(responseFromBpmnJson.completed);
        system:println(completed);
        if(!completed){
            processInstanceId,_ = <int>jsons:toString(responseFromBpmnJson.id);
            taskId = getTaskIdFromProcessId(processInstanceId);
            repositoryName = jsons:toString(requestData[0]);
            databaseUpdateReturnValue = database:repositoryUpdateTaskAndProcessIds(taskId,processInstanceId,repositoryName);

            if(databaseUpdateReturnValue > 0){
                response = {"responseType":"Done","responseMessage":"done"};
            }else{
                response = {"responseType":"Error","responseMessage":"Task ID and Process ID update fails"};
            }

        }else{
            response = {"responseType":"Error","responseMessage":"BPMN Error occurs"};
        }


    }catch(errors:Error err){
        response = {"responseType":"Error","responseMessage":err.msg};
        system:println(err);

    }
    return response;
}

function acceptRepositoryRequest(string repoId, string taskId)(json responseJson){
    message response = {};
    message request = {};
    json requestJson;
    json variables;
    string url;
    try{
        if(httpConnectorBpmn == null){
            setBpmnConnection();
        }
        variables = [
                        {
                            "name": "outputType",
                            "value": "Done"
                        },
                        {
                            "name": "repositoryId",
                            "value": repoId
                        }
                    ];
        requestJson = {
                          "action": "complete",
                          "variables": variables
                      };
        system:println(requestJson);
        messages:setJsonPayload(request,requestJson);
        messages:setHeader(request,"Authorization",bpmnBasicAuthToken);
        url = "bpmn/runtime/tasks/" + taskId;
        response = httpConnectorBpmn.post(url,request);

        system:println(response);

        responseJson = {"responseType":"Done","responseMessage":"done"};

    }catch(errors:Error err){
        system:println(err);
        responseJson = {"responseType":"Error","responseMessage":err.msg};

    }
    return;
}

function rejectRepositoryRequest(string taskId, string rejectBy, string reasonForRejecting )(json responseJson){
    message response = {};
    message request = {};
    json requestJson;
    json variables;
    string url;
    try{
        if(httpConnectorBpmn == null){
            setBpmnConnection();
        }
        variables = [
                        {
                            "name": "outputType",
                            "value": "Reject"
                        },
                        {
                            "name": "rejectBy",
                            "value": rejectBy
                        },
                        {
                            "name": "reasonForReject",
                            "value": reasonForRejecting
                        }
                    ];
        requestJson = {
                          "action": "complete",
                          "variables": variables
                      };
        system:println(requestJson);
        messages:setJsonPayload(request,requestJson);
        messages:setHeader(request,"Authorization",bpmnBasicAuthToken);
        url = "bpmn/runtime/tasks/" + taskId;
        response = httpConnectorBpmn.post(url,request);

        system:println(response);

        responseJson = {"responseType":"Done","responseMessage":"done"};

    }catch(errors:Error err){
        system:println(err);
        responseJson = {"responseType":"Error","responseMessage":err.msg};

    }
    return;
}

function bpmnRequestLibrary(json requestData)(json){
    message requestMessage = {};
    message responseFromBpmn = {};
    json requestPayloadJson;
    json responseFromBpmnJson;
    json libraryMainUsers;
    json variables;
    json response;
    string url;
    string sendToList = " ";
    string libraryName;
    string libraryUseVersion;
    int taskId;
    int processInstanceId;
    int i = 0;
    int libraryMainUsersJsonLength;
    int databaseUpdateReturnValue;
    boolean completed = true;

    try{
        if(httpConnectorBpmn == null){
            setBpmnConnection();
        }
        libraryMainUsers = database:roleSelectLibraryMainUsers();
        libraryMainUsersJsonLength = lengthof libraryMainUsers;
        while(i < libraryMainUsersJsonLength){
            sendToList = sendToList + jsons:toString(libraryMainUsers[i].ROLE_EMAIL) + ", ";
            i = i + 1;
        }
        url = "bpmn/runtime/process-instances/";
        variables = [
                        {"name": "data","value":requestData},
                        {"name": "sendToList","value":sendToList}
                    ];
        messages:setHeader(requestMessage,"Authorization",bpmnBasicAuthToken);
        requestPayloadJson = {
                                 "processDefinitionKey": "libraryApprovalProcess",
                                 "businessKey": "myBusinessKey",
                                 "tenantId": "-1234",
                                 "variables":variables
                             };
        messages:setJsonPayload(requestMessage,requestPayloadJson);
        responseFromBpmn = http:ClientConnector.post(httpConnectorBpmn,url,requestMessage);
        responseFromBpmnJson = messages:getJsonPayload(responseFromBpmn);
        completed, _ = <boolean> jsons:toString(responseFromBpmnJson.completed);
        system:println(completed);
        if(!completed){
            processInstanceId,_ = <int>jsons:toString(responseFromBpmnJson.id);
            taskId = getTaskIdFromProcessId(processInstanceId);
            libraryName = jsons:toString(requestData.libName);
            libraryUseVersion = jsons:toString(requestData.libUseVersion);
            databaseUpdateReturnValue = database:libraryRequestUpdateTaskAndProcessIds(taskId,processInstanceId,libraryName,libraryUseVersion);
            if(databaseUpdateReturnValue > 0){
                response = {"responseType":"Done","responseMessage":"done"};
            }else{
                response = {"responseType":"Error","responseMessage":"Task ID and Process ID update fails"};
            }

        }else{
            response = {"responseType":"Error","responseMessage":"BPMN Error occurs"};
        }


    }catch(errors:Error err){
        response = {"responseType":"Error","responseMessage":err.msg};
        system:println(err);

    }
    return response;
}

function getTaskIdFromProcessId(int processId)(int taskId){

    message requestForBpmn = {};
    message responseFromBpmn = {};
    json responseFromBpmnJson;
    string url;
    int currentProcessId;
    int responseFromBpmnJsonLength = 0;
    int i = 0;

    try{
        if(httpConnectorBpmn == null){
            setBpmnConnection();
        }
        messages:setHeader(requestForBpmn,"Authorization",bpmnBasicAuthToken);
        url = "bpmn/runtime/tasks/";
        responseFromBpmn = httpConnectorBpmn.get(url,requestForBpmn);
        responseFromBpmnJson = messages:getJsonPayload(responseFromBpmn);
        responseFromBpmnJson = responseFromBpmnJson.data;
        responseFromBpmnJsonLength = lengthof responseFromBpmnJson;
        while(i < responseFromBpmnJsonLength){
            currentProcessId,_ = <int>jsons:toString(responseFromBpmnJson[i].processInstanceId);
            if(currentProcessId == processId){
                taskId,_ = <int>jsons:toString(responseFromBpmnJson[i].id);
                return;
            }
            i = i + 1;
        }
    }catch(errors:Error err){
        taskId = 0;
        system:println(err);

    }
    taskId = 0;
    return;
}

function acceptLibraryRequest(string taskId)(json responseJson){
    message response = {};
    message request = {};
    json requestJson;
    json variables;
    string url;
    string headerStatus;
    try{
        if(httpConnectorBpmn == null){
            setBpmnConnection();
        }
        variables = [
                        {
                            "name": "outputType",
                            "value": "Done"
                        }
                    ];
        requestJson = {
                          "action": "complete",
                          "variables": variables
                      };
        system:println(requestJson);
        messages:setJsonPayload(request,requestJson);
        messages:setHeader(request,"Authorization",bpmnBasicAuthToken);
        url = "bpmn/runtime/tasks/" + taskId;
        response = httpConnectorBpmn.post(url,request);

        system:println(response);

        responseJson = {"responseType":"Done","responseMessage":"done"};

    }catch(errors:Error err){
        system:println(err);
        responseJson = {"responseType":"Error","responseMessage":err.msg};

    }
    return;
}

function rejectLibraryRequest(string taskId)(json responseJson){
    message response = {};
    message request = {};
    json requestJson;
    json variables;
    string url;
    string headerStatus;
    try{
        if(httpConnectorBpmn == null){
            setBpmnConnection();
        }
        variables = [
                        {
                            "name": "outputType",
                            "value": "Reject"
                        }
                    ];
        requestJson = {
                          "action": "complete",
                          "variables": variables
                      };
        system:println(requestJson);
        messages:setJsonPayload(request,requestJson);
        messages:setHeader(request,"Authorization",bpmnBasicAuthToken);
        url = "bpmn/runtime/tasks/" + taskId;
        response = httpConnectorBpmn.post(url,request);

        system:println(response);

        responseJson = {"responseType":"Done","responseMessage":"done"};

    }catch(errors:Error err){
        system:println(err);
        responseJson = {"responseType":"Error","responseMessage":err.msg};

    }
    return;
}

