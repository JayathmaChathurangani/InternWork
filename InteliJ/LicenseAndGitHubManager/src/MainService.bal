package src;

import ballerina.net.http;
import services;
import database;
import ballerina.lang.messages;
import ballerina.lang.system;
import ballerina.lang.jsons;
import ballerina.lang.errors;



@http:configuration {basePath:"/"}

service<http> MainService {

    @http:POST {}
    @http:Path {value:"/createRepositories"}
    resource createRepositories (message m) {
        message responseGitHub = {};
        message finalResponse = {};
        json responseGitHubJson = null;
        json finalResponseJson = {"responseType":"Done","responseMessage":" ","toSend":" "};
        try {

            responseGitHub = services:createGitHubRepository(m);
            responseGitHubJson = messages:getJsonPayload(responseGitHub);

            json requestDataJson = messages:getJsonPayload(m);

            int repositoryId;
            repositoryId,_ = <int> jsons:toString(requestDataJson.repositoryId);

            message responseDataFromDb = database:repositorySelectFromId(repositoryId);
            json responseDataFromDbJson = messages:getJsonPayload(responseDataFromDb);

            finalResponseJson = {"responseType":"Done","responseMessage":" ","responseDefault":"Done","repoUpdatedDetails":responseDataFromDbJson[0]};
            system:println(finalResponseJson);
            messages:setJsonPayload(finalResponse,finalResponseJson);

        }catch(errors:Error err){
            json errorMessage = {"responseType":"Error","responseMessages":err.msg};
            messages:setJsonPayload(finalResponse,errorMessage);
            system:println(errorMessage);


        }


        reply finalResponse;
    }

    @http:POST {}
    @http:Path {value:"/gitHub/setIssueTemplate"}
    resource gitHubSetIssueTemplateResource(message m){

        json requestJson = messages:getJsonPayload(m);
        string organization = jsons:toString(requestJson.organization);
        string repositoryName = jsons:toString(requestJson.repositoryName);
        message response = services:setIssueTemplate(organization,repositoryName);
        reply response;
    }

    @http:POST {}
    @http:Path {value:"/createNexus"}
    resource createNexus (message m) {
        system:println("call Nexus");
        system:println(m);
        message response = services:createNexus(m);
        system:println(response);
        reply response;

    }

    @http:POST {}
    @http:Path {value:"/createJenkins"}
    resource createJenkins (message m) {
        system:println("call Jenkins");
        system:println(m);
        message response = services:createJenkinsJob(m);
        system:println(response);
        reply response;
    }

    @http:GET {}
    @http:Path {value:"/getAllLanguages"}
    resource getAllLanguages (message m) {


        message response = services:getAllLanguages(m);
        system:println("languages");
        
        reply response;
    }


    @http:POST {}
    @http:Path {value:"/databaseService/repository/insertData"}
    resource repositoryInsertDataResource(message m){

        json requestJson = messages:getJsonPayload(m);
        string name;
        string language;
        boolean buildable;
        boolean nexus;
        boolean private;
        string description;
        string groupId;
        int license;
        int team;
        int organization;
        int repoType;
        string requestBy;

        name = jsons:toString(requestJson.data[0]);
        language = jsons:toString(requestJson.data[1]);
        buildable,_ =  <boolean>(jsons:toString(requestJson.data[2]));
        nexus,_ = <boolean>(jsons:toString(requestJson.data[3]));
        private,_ = <boolean>(jsons:toString(requestJson.data[4]));
        description = jsons:toString(requestJson.data[5]);
        groupId = jsons:toString(requestJson.data[6]);
        license,_ = <int>(jsons:toString(requestJson.data[7]));
        team,_ = <int>(jsons:toString(requestJson.data[8]));
        organization,_ = <int>(jsons:toString(requestJson.data[9]));
        repoType,_ = <int>(jsons:toString(requestJson.data[10]));
        requestBy = jsons:toString(requestJson.data[11]);

        int responseValue = database:repositoryInsertData(name,language,buildable,nexus,private,description,groupId,license,team,organization,repoType,requestBy);


        system:println(name);
        json responseJson;
        message response = {};

        if(responseValue > 0){
            message getInsertedDataMessage = database:repositorySelectFromName(name);
            json getInsertedDataJson = messages:getJsonPayload(getInsertedDataMessage);
            responseJson = {"responseType":"Done","responseMessage":" ","repositoryId":jsons:toString(getInsertedDataJson[0].REPOSITORY_ID)};
        }else{
            responseJson = {"responseType":"Error","responseMessage":" "};
        }

        messages:setJsonPayload(response,responseJson);
        reply response;
    }

    @http:POST {}
    @http:Path {value:"/databaseService/repository/updateBpmnAndTaskIds"}
    resource updateBpmnAndTaskIdsResource(message m){

        json requestJson = messages:getJsonPayload(m);
        int taskId;
        int processId;
        string repositoryName;

        taskId,_ = <int>(jsons:toString(requestJson.data[0]));
        processId,_ = <int>(jsons:toString(requestJson.data[1]));
        repositoryName = jsons:toString(requestJson.data[2]);

        int responseValue = database:repositoryUpdateTaskAndProcessIds(taskId,processId,repositoryName);

        json responseJson;
        message response = {};

        if(responseValue > 0){
            responseJson = {"responseType":"Done","responseMessage":" "};
        }else{
            responseJson = {"responseType":"Error","responseMessage":" "};
        }

        messages:setJsonPayload(response,responseJson);
        reply response;
    }

    @http:POST {}
    @http:Path {value:"/databaseService/repository/updateRejectDetails"}
    resource updateRejectDetailsResource(message m){

        json requestJson = messages:getJsonPayload(m);
        string rejectBy;
        string rejectReason;
        int repositoryId;

        rejectBy = jsons:toString(requestJson.data[0]);
        rejectReason = jsons:toString(requestJson.data[1]);
        repositoryId,_ = <int>(jsons:toString(requestJson.data[2]));

        int responseValue = database:repositoryUpdateRejectDetails(rejectBy,rejectReason,repositoryId);

        json responseJson;
        message response = {};

        if(responseValue > 0){
            responseJson = {"responseType":"Done","responseMessage":" "};
        }else{
            responseJson = {"responseType":"Error","responseMessage":" "};
        }

        messages:setJsonPayload(response,responseJson);
        reply response;
    }

    @http:POST {}
    @http:Path {value:"/databaseService/repository/updateAll"}
    resource repositoryUpdateAllResource(message m){
        system:println(m);
        json requestJson = messages:getJsonPayload(m);
        string name;
        string language;
        boolean buildable;
        boolean nexus;
        boolean private;
        string description;
        string groupId;
        int license;
        int team;
        int organization;
        int repoType;
        boolean accept;
        string acceptBy;
        int repositoryId;

        name = jsons:toString(requestJson.data[0]);
        language = jsons:toString(requestJson.data[1]);
        buildable,_ =  <boolean>(jsons:toString(requestJson.data[2]));
        nexus,_ = <boolean>(jsons:toString(requestJson.data[3]));
        private,_ = <boolean>(jsons:toString(requestJson.data[4]));
        description = jsons:toString(requestJson.data[5]);
        groupId = jsons:toString(requestJson.data[6]);
        license,_ = <int>(jsons:toString(requestJson.data[7]));
        team,_ = <int>(jsons:toString(requestJson.data[8]));
        organization,_ = <int>(jsons:toString(requestJson.data[9]));
        repoType,_ = <int>(jsons:toString(requestJson.data[10]));
        accept,_ = <boolean>(jsons:toString(requestJson.data[11]));
        acceptBy = jsons:toString(requestJson.data[12]);
        repositoryId,_ = <int>(jsons:toString(requestJson.repoId));

        int responseValue = database:repositoryUpdateAll(name,language,buildable,nexus,private,description,groupId,license,team,organization,repoType,accept,acceptBy,repositoryId);

        json responseJson;
        message response = {};

        if(responseValue > 0){
            responseJson = {"responseType":"Done","responseMessage":" "};
        }else{
            responseJson = {"responseType":"Error","responseMessage":" "};
        }

        messages:setJsonPayload(response,responseJson);
        reply response;
    }



    @http:GET {}
    @http:Path {value:"/databaseService/repository/selectAll"}
    resource repositorySelectAllResource(message m){

        message response = database:repositorySelectAll();
        reply response;
    }

    @http:GET {}
    @http:Path {value:"/databaseService/repository/selectFromName"}
    resource repositorySelectFromNameResource(@http:QueryParam {value:"name"} string name){

        message response = database:repositorySelectFromName(name);
        reply response;
    }

    @http:GET {}
    @http:Path {value:"/databaseService/repository/selectFromId"}
    resource repositorySelectFromIdResource(@http:QueryParam {value:"id"} int id){


        message response = database:repositorySelectFromId(id);
        reply response;
    }

    @http:GET {}
    @http:Path {value:"/databaseService/repository/selectFromRequestByAndWaiting"}
    resource repositorySelectFromRequestByResource(@http:QueryParam {value:"requestBy"} string requestBy){


        message response = database:repositorySelectFromRequestByAndWaiting(requestBy);
        reply response;
    }

    @http:GET {}
    @http:Path {value:"/databaseService/license/selectAll"}
    resource licenseSelectAllResource(message m){

        message response = database:licenseSelectAll();
        reply response;
    }

    @http:GET {}
    @http:Path {value:"/databaseService/organization/selectAll"}
    resource organizationSelectAllResource(message m){

        message response = database:organizationSelectAll();
        reply response;
    }

    @http:GET {}
    @http:Path {value:"/databaseService/repoType/selectAll"}
    resource typeSelectAllResource(message m){

        message response = database:repositoryTypeSelectAll();
        reply response;
    }

    @http:GET {}
    @http:Path {value:"/databaseService/team/selectAll"}
    resource teamSelectAllResource(message m){

        message response = database:teamSelectAll();
        reply response;
    }

    @http:GET {}
    @http:Path {value:"/databaseService/component/selectAll"}
    resource componentSelectAllResource(message m){

        message response = database:componentSelectAll();
        reply response;
    }

    @http:GET {}
    @http:Path {value:"/databaseService/user/selectMainUsers"}
    resource userSelectMainUsersResource(message m){

        message response = database:userSelectMainUsers();
        reply response;
    }




}
