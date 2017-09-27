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
            system:println(m);
            json requestDataJson = messages:getJsonPayload(m);

            string repositoryId = jsons:toString(requestDataJson.repositoryId);
            string condition = "WHERE REPOSITORY_ID = " + repositoryId + " ";
            json requestDataFromDbJson =  {"tableName":"LM_REPOSITORY","select":"*","condition":condition};
            messages:setJsonPayload(requestDataFromDb,requestDataFromDbJson);
            message responseDataFromDb = services:selectData(requestDataFromDb);
            json responseDataFromDbJson = messages:getJsonPayload(responseDataFromDb);

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
                system:println("call nexus");
                groupId = jsons:toString(responseDataFromDbJson[0].REPOSITORY_GROUPID);
                requestNexusJson = {"name":repositoryName,"id":groupId};
                messages:setJsonPayload(requestNexusMessage,requestNexusJson);
                responseNexus = services:createNexus(requestNexusMessage);
                responseNexusJson = messages:getJsonPayload(responseNexus);
                system:println("create Nexus");
            }

            if(buildable == "true"){
                requestJenkinsJson = {"name":repositoryName};
                messages:setJsonPayload(requestJenkinsMessage,requestJenkinsJson);
                responseJenkins = services:createJenkinsJob(requestJenkinsMessage);
                responseJenkinsJson = messages:getJsonPayload(responseJenkins);
                system:println("create Jenkins");
            }




            if((responseGitHubJson != null) && (jsons:toString(responseGitHubJson.responseType) == "Error")){
                finalMessage = finalMessage + jsons:toString(responseGitHubJson.responseMessage);
                finalMessageToSend = finalMessageToSend + "GitHub repository creation fails , ";
                finalResponseJson = {"responseType":"Error","responseMessage":finalMessage,"toSend":finalMessageToSend};
                system:println(finalResponseJson);
            }
            if((responseNexusJson != null) && ((jsons:toString(responseNexusJson.responseType)) == "Error")){
                 finalMessage = finalMessage + jsons:toString(responseNexusJson.responseMessage);
                 finalMessageToSend = finalMessageToSend + "Nexus repository creation fails , ";
                 finalResponseJson = {"responseType":"Error","responseMessage":finalMessage,"toSend":finalMessageToSend};
                 system:println(finalResponseJson);
            }
            if((responseJenkinsJson != null) && ((jsons:toString(responseJenkinsJson.responseType)) == "Error")){
                finalMessage = finalMessage + jsons:toString(responseJenkinsJson.responseMessage);
                finalMessageToSend = finalMessageToSend + "Jenkins job creation fails , ";
                finalResponseJson = {"responseType":"Error","responseMessage":finalMessage,"toSend":finalMessageToSend};
                system:println(finalResponseJson);
            }

            messages:setJsonPayload(finalResponse,finalResponseJson);

        }catch(errors:Error err){
            json errorMessage = {"responseType":"Error","responseMessages":err.msg};
            messages:setJsonPayload(finalResponse,errorMessage);
            system:println("error");
            system:println(errorMessage);


        }

        system:println(finalResponse);
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
    @http:Path {value:"/databseService/deleteData"}
    resource deleteData(message m){

        message response = services:deleteData(m);
        reply response;
    }

    @http:POST {}
    @http:Path {value:"/databseService/repository/insertData"}
    resource repositoryInsertDataResource(message m){

        json requestJson = messages:getJsonPayload(m);

        int responseValue = database:repositoryInsertData();
        reply response;
    }

    @http:POST {}
    @http:Path {value:"/mailService/sendMail"}
    resource sendMail(message m){

        message response = services:sendMail(m);
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
