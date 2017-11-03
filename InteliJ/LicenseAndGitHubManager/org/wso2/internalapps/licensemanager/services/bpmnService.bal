package org.wso2.internalapps.licensemanager.services;

import ballerina.net.http;
import org.wso2.internalapps.licensemanager.conf;
import ballerina.lang.messages;
import ballerina.lang.system;
import ballerina.lang.errors;

http:ClientConnector httpConnectorBpmn;
string bpmnStartUrl = conf:getConfigData("bpmnStartUrl");

function setBpmnConnection(){
    system:println("connect 1");
    httpConnectorBpmn = create http:ClientConnector(bpmnStartUrl);
    system:println("connect 2");

}
function acceptRepositoryProcess(string taskId, string repoId)(json){
    message requestMessage = {};
    message responseFromBpmn = {};
    json requestPayloadJson;
    json variables;
    json response;
    string url;

    try{
        if(httpConnectorBpmn == null){
            setBpmnConnection();
        }
        url = "bpmn/runtime/process-instances/";
        variables = [{"name": "outputType","value":"Done"},{"name": "repositoryId","value":repoId}];
        requestPayloadJson = {"action":"complete","variables":variables};
        messages:setJsonPayload(requestMessage,requestPayloadJson);
        system:println(url);
        system:println(requestMessage);
        system:println(bpmnStartUrl);
        responseFromBpmn = httpConnectorBpmn.get(url,requestMessage);
        system:println("done");
        response = {"responseType":"Done","responseMessage":"done"};
    }catch(errors:Error err){
        response = {"responseType":"Error","responseMessage":err.msg};
        system:println(err);

    }
    return response;
}

function rejectRepositoryProcess(string taskId, string repoId)(json){
    message requestMessage = {};
    message responseFromBpmn = {};
    json requestPayloadJson;
    json variables;
    json response;
    string url;

    try{
        if(httpConnector == null){
            setBpmnConnection();
        }
        url = "bpmn/runtime/process-instances/" + taskId;
        variables = [{"name": "outputType","value":"Done"},{"name": "repositoryId","value":repoId}];
        requestPayloadJson = {"action":"complete","variables":variables};
        messages:setJsonPayload(requestMessage,requestPayloadJson);
        system:println(url);
        system:println(requestMessage);
        responseFromBpmn = httpConnector.post(url,requestMessage);
        system:println(responseFromBpmn);
        response = {"responseType":"Done","responseMessage":"done"};
    }catch(errors:Error err){
        response = {"responseType":"Error","responseMessage":err.msg};
        system:println(err);

    }
    return response;
}