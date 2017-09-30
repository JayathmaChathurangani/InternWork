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
        message responseNexus = {};
        message responseJenkins = {};
        message finalResponse = {};
        json responseGitHubJson = null;
        json responseNexusJson = null;
        json responseJenkinsJson = null;
        json finalResponseJson = {"responseType":"Done","responseMessage":" ","toSend":" "};
        string finalMessage = " ";
        string finalMessageToSend = " ";
        try {
            message requestDataFromDb = {};
            responseGitHub = services:createGitHubRepository(m);
            responseGitHubJson = messages:getJsonPayload(responseGitHub);
            system:println(responseGitHubJson);
            json requestDataJson = messages:getJsonPayload(m);

            string repositoryId = jsons:toString(requestDataJson.repositoryId);
            string condition = "WHERE REPOSITORY_ID = " + repositoryId + " ";
            json requestDataFromDbJson =  {"tableName":"LM_REPOSITORY","select":"*","condition":condition};
            messages:setJsonPayload(requestDataFromDb,requestDataFromDbJson);
            message responseDataFromDb = services:selectData(requestDataFromDb);
            json responseDataFromDbJson = messages:getJsonPayload(responseDataFromDb);

            finalResponseJson = {"responseType":"Done","responseMessage":" ","toSend":" ","repoUpdatedDetails":responseDataFromDbJson[0]};
            system:println(responseDataFromDbJson);
            string nexus = jsons:toString(responseDataFromDbJson[0].REPOSITORY_NEXUS);
            string buildable = jsons:toString(responseDataFromDbJson[0].REPOSITORY_BUILDABLE);
            string repositoryName = jsons:toString(responseDataFromDbJson[0].REPOSITORY_NAME);
            string groupId = " ";

            message requestNexusMessage = {};
            json requestNexusJson = {};
            system:println(nexus);
            message requestJenkinsMessage = {};
            json requestJenkinsJson = {};
            if(nexus == "true"){

                groupId = jsons:toString(responseDataFromDbJson[0].REPOSITORY_GROUPID);
                requestNexusJson = {"name":repositoryName,"id":groupId};
                messages:setJsonPayload(requestNexusMessage,requestNexusJson);
                responseNexus = services:createNexus(requestNexusMessage);
                responseNexusJson = messages:getJsonPayload(responseNexus);

            }

            if(buildable == "true"){
                requestJenkinsJson = {"name":repositoryName};
                messages:setJsonPayload(requestJenkinsMessage,requestJenkinsJson);
                responseJenkins = services:createJenkinsJob(requestJenkinsMessage);
                responseJenkinsJson = messages:getJsonPayload(responseJenkins);

            }




            if((responseGitHubJson != null) && (jsons:toString(responseGitHubJson.responseType) == "Error")){
                finalMessage = finalMessage + jsons:toString(responseGitHubJson.responseMessage);
                finalMessageToSend = finalMessageToSend + "GitHub repository creation fails , ";
                finalResponseJson = {"responseType":"Error","responseMessage":finalMessage,"toSend":finalMessageToSend};

            }
            if((responseNexusJson != null) && ((jsons:toString(responseNexusJson.responseType)) == "Error")){
                 finalMessage = finalMessage + jsons:toString(responseNexusJson.responseMessage);
                 finalMessageToSend = finalMessageToSend + "Nexus repository creation fails , ";
                 finalResponseJson = {"responseType":"Error","responseMessage":finalMessage,"toSend":finalMessageToSend};

            }
            if((responseJenkinsJson != null) && ((jsons:toString(responseJenkinsJson.responseType)) == "Error")){
                finalMessage = finalMessage + jsons:toString(responseJenkinsJson.responseMessage);
                finalMessageToSend = finalMessageToSend + "Jenkins job creation fails , ";
                finalResponseJson = {"responseType":"Error","responseMessage":finalMessage,"toSend":finalMessageToSend};

            }

            messages:setJsonPayload(finalResponse,finalResponseJson);

        }catch(errors:Error err){
            json errorMessage = {"responseType":"Error","responseMessages":err.msg};
            messages:setJsonPayload(finalResponse,errorMessage);

            system:println(errorMessage);


        }


        reply finalResponse;
    }

    @http:GET {}
    @http:Path {value:"/getAllLanguages"}
    resource getAllLanguages (message m) {


        message response = services:getAllLanguages(m);
        reply response;
    }

    @http:POST {}
    @http:Path {value:"/databaseService/selectData"}
    resource select(message m){

        message response = services:selectData(m);
        reply response;
    }


    @http:POST {}
    @http:Path {value:"/databaseService/insertData"}
    resource insertData(message m){
        message response = services:insertData(m);
        reply response;


    }

    @http:POST {}
    @http:Path {value:"/databaseService/updateData"}
    resource updateData(message m){
        message response = services:updateData(m);
        reply response;


    }


    @http:POST {}
    @http:Path {value:"/databaseService/deleteData"}
    resource deleteData(message m){

        message response = services:deleteData(m);
        reply response;
    }

    @http:POST {}
    @http:Path {value:"/databaseService/repository/insertData"}
    resource repositoryInsertDataResource(message m){
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
        system:println(responseValue);


        json responseJson;
        message response = {};

        if(responseValue > 0){
            message getInsertedDataMessage = database:repositorySelectFromName(name);
            json getInsertedDataJson = messages:getJsonPayload(getInsertedDataMessage);
            system:println(getInsertedDataMessage);
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

    @http:POST {}
    @http:Path {value:"/mailService/sendMail"}
    resource sendMail(message m){

        message response = services:sendMail(m);
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

        system:println(name);
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
    @http:Path {value:"/databaseService/repository/selectFromRequestBy"}
    resource repositorySelectFromRequestByResource(@http:QueryParam {value:"requestBy"} string requestBy){


        message response = database:repositorySelectFromRequestBy(requestBy);
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
        system:println("call resource");
        message response = database:userSelectMainUsers();
        reply response;
    }

    @http:POST {}
    @http:Path {value:"/mailService/sendAckMail"}
    resource sendAckMail(message m){

        message response = services:sendAckMail(m);
        reply response;
    }

    @http:POST {}
    @http:Path {value:"/createJenkins"}
    resource createJenkins(message m){

        message response = services:createJenkinsJob(m);
        reply response;
    }

    @http:POST {}
    @http:Path {value:"/createNexus"}
    resource createNexus(message m){

        message response = services:createNexus(m);
        reply response;
    }

}
