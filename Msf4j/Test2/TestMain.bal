

import ballerina.data.sql;
import ballerina.lang.system;
import ballerina.lang.errors;
import ballerina.lang.messages;

function main (string[] args) {
    //http:ClientConnector clientConnector = create http:ClientConnector("https://10.100.4.38:9445/");
    //message request = {};
    //messages:setHeader(request,"Authorization","Basic YWRtaW46YWRtaW4=");
    //json requestPayloadJson = {
    //                              "processDefinitionKey": "libraryApprovalProcess",
    //                              "businessKey": "myBusinessKey",
    //                              "tenantId": "-1234",
    //                              "variables":[]
    //                          };
    //messages:setJsonPayload(request,requestPayloadJson);
    //message response = clientConnector.post("bpmn/runtime/process-instances/",request);
    //system:println(response);
    int num = libraryRequestUpdateTaskAndProcessIds(123,1234,"L5","L5");
}

function libraryRequestUpdateTaskAndProcessIds(int taskId,int processId,string libraryName, string useVersion)(int){
    message response = {};
    int returnValue;
    map propertiesMap = {"jdbcUrl":"jdbc:mysql://localhost:3306/licensemanager?useSSL=false", "username":"root", "password":"Incorrect","maximumPoolSize":1};
    sql:ClientConnector connection = create sql:ClientConnector(propertiesMap);

    try{


        string query = "UPDATE LM_LIBREQUEST SET LIBREQUEST_BPMN_TASK_ID = ? , LIBREQUEST_BPMN_PROCESS_ID = ? WHERE LIBREQUEST_NAME = ? AND LIBREQUEST_USE_VERSION = ?";
        system:println(query);
        sql:Parameter paraTaskId = {sqlType:"integer", value:taskId};
        sql:Parameter paraProcessId = {sqlType:"integer", value:processId};
        sql:Parameter paraLibraryName = {sqlType:"varchar", value:libraryName};
        sql:Parameter paraUseVersion = {sqlType:"varchar", value:useVersion};
        sql:Parameter[] parameterArray = [paraTaskId,paraProcessId,paraLibraryName,paraUseVersion];

        returnValue = connection.update(query,parameterArray);
        system:println(returnValue);
    }catch(errors:Error err){
        json errorMessage = {"responseType":"Error","responseMessage":err.msg};
        messages:setJsonPayload(response,errorMessage);

    }

    return returnValue;
}
