package src;

import ballerina.net.http;
import services;
import ballerina.lang.messages;
import ballerina.lang.jsons;


@http:configuration {basePath:"/"}
service<http> MainService {

    @http:POST {}
    @http:Path {value:"/createRepositories"}
    resource createJenkinsJob (message m) {

        message response = {};
        message responseGitHub = services:createGitHubRepository(m);
        message requestDataFromDb = {};
        json requestDataJson = messages:getJsonPayload(m);
        string  condition = "WHERE REPOSITORYTYPE_ID = " + jsons:toString(requestDataJson.data[9]);
        json requestDataFromDbJson =  {"tableName":"LM_REPOSITORYTYPE","select":"*","condition":condition};
        messages:setJsonPayload(requestDataFromDb,requestDataFromDbJson);
        message responseDataFromDb = services:selectData(requestDataFromDb);
        responseDataFromDbJson = messages:getJsonPayload(responseDataFromDb);
        

        reply response;
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

}
