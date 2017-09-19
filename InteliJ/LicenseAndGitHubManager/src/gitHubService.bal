package src;

import ballerina.net.http;
import ballerina.lang.system;
import ballerina.lang.messages;
import ballerina.lang.errors;
import ballerina.lang.jsons;


@http:configuration {basePath:"/gitHubService"}
service<http> gitHubService {

    string URL = "http://localhost:9090/databaseService/";
    string gitHubApiUrl = "https://api.github.com/";
    http:ClientConnector httpConnector = create http:ClientConnector(gitHubApiUrl);
    http:ClientConnector httpDbConnector = create http:ClientConnector(URL);
    @http:GET {}
    @http:Path {value:"/getAllLanguages"}
    resource getAllLanguages (message m) {

        message response = {};

        response = httpConnector.get("gitignore/templates",m);
        system:println("calles");
        reply response;
    }


    @http:POST {}
    @http:Path {value:"/createRepository"}
    resource createRepository (message m) {
        message response = {};

        try{
            json requestDataFromDbJson;
            json responseDataFromDbJson;
            json requestJson = messages:getJsonPayload(m);
            system:println(requestJson);
            message requestDataFromDb = {};
            message responseDataFromDb = {};
            string condition;
            string repositoryName = jsons:toString(requestJson.data[0]);
            string repositoryLanguage = jsons:toString(requestJson.data[1]);
            string repositoryDescription = jsons:toString(requestJson.data[4]);
            string repositoryLicense = jsons:toString(requestJson.data[6]);
            string repositoryOrganization = jsons:toString(requestJson.data[8]);
            string accessToken = "db7b44323d4796774bfb14eda750ccb325b4e62e";


            condition = "WHERE ORGANIZATION_ID = '" + repositoryOrganization + "' ";
            system:println(condition);
            requestDataFromDbJson =  {"tableName":"LM_ORGANIZATION","select":"ORGANIZATION_NAME","condition":condition};
            messages:setJsonPayload(requestDataFromDb,requestDataFromDbJson);
            responseDataFromDb = httpDbConnector.post("/select",requestDataFromDb);
            responseDataFromDbJson = messages:getJsonPayload(responseDataFromDb);
            system:println(responseDataFromDbJson);
            repositoryOrganization = jsons:toString(responseDataFromDbJson[0].ORGANIZATION_NAME);



            condition = "WHERE LICENSE_ID = '" + repositoryLicense + "' ";
            requestDataFromDbJson =  {"tableName":"LM_LICENSE","select":"LICENSE_KEY","condition":condition};
            messages:setJsonPayload(requestDataFromDb,requestDataFromDbJson);
            responseDataFromDb = httpDbConnector.post("/select",requestDataFromDb);
            responseDataFromDbJson = messages:getJsonPayload(responseDataFromDb);
            repositoryLicense = jsons:toString(responseDataFromDbJson[0].LICENSE_KEY);

            system:println(condition);
            string postUrl = "orgs/"+repositoryOrganization + "/repos?access_token=" + accessToken;

            json requestDataJsonForGitHubApi = {
                                                   "name":repositoryName,
                                                   "description":repositoryDescription,
                                                   "private":requestJson.data[3],
                                                   "gitignore_template":repositoryLanguage,
                                                   "license_template":repositoryLicense
                                               };
            system:println(requestDataJsonForGitHubApi);
            message requestMessageForGitHub = {};
            messages:setJsonPayload(requestMessageForGitHub,requestDataJsonForGitHubApi);
            message responseFromGitHubApi = httpConnector.post(postUrl,requestMessageForGitHub);

            system:println(responseFromGitHubApi);
            json responseMessage = {"type":"Done","message":"done"};
            messages:setJsonPayload(response,responseMessage);
            reply response;
        }catch(errors:Error err){
            json errorMessage = {"type":"Error","message":err.msg};
            system:println(err);
            messages:setJsonPayload(response,errorMessage);
            reply response;
        }


    }

}
