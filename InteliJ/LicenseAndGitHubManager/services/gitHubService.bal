package services;


import ballerina.lang.system;
import ballerina.lang.messages;
import ballerina.lang.errors;
import ballerina.lang.jsons;
import ballerina.net.http;


string gitHubApiUrl = "https://api.github.com/";


function createGitHubRepository(message m)(message ){
    message response = {};
    try{
        json requestDataFromDbJson;
        json responseDataFromDbJson;
        json requestJson = messages:getJsonPayload(m);
        message requestDataFromDb = {};
        message responseDataFromDb = {};
        string condition;
        string accessToken = "";
        string repositoryId = jsons:toString(requestJson.repositoryId);

        condition = "WHERE USER_PERMISSION = 'ALL'";
        requestDataFromDbJson =  {"tableName":"LM_USER","select":"*","condition":condition};
        messages:setJsonPayload(requestDataFromDb,requestDataFromDbJson);
        responseDataFromDb = selectData(requestDataFromDb);
        responseDataFromDbJson = messages:getJsonPayload(responseDataFromDb);
        accessToken = jsons:toString(responseDataFromDbJson[0].USER_TOKEN);

        condition = "WHERE REPOSITORY_ID = " + repositoryId + " ";
        requestDataFromDbJson =  {"tableName":"LM_REPOSITORY","select":"*","condition":condition};
        messages:setJsonPayload(requestDataFromDb,requestDataFromDbJson);
        responseDataFromDb = selectData(requestDataFromDb);
        responseDataFromDbJson = messages:getJsonPayload(responseDataFromDb);


        string repositoryName = jsons:toString(responseDataFromDbJson[0].REPOSITORY_NAME);
        string repositoryLanguage = jsons:toString(responseDataFromDbJson[0].REPOSITORY_LANGUAGE);
        string repositoryDescription = jsons:toString(responseDataFromDbJson[0].REPOSITORY_DESCRIPTION);
        string repositoryLicense = jsons:toString(responseDataFromDbJson[0].REPOSITORY_LICENSE);
        string repositoryOrganization = jsons:toString(responseDataFromDbJson[0].REPOSITORY_ORGANIZATION);
        string repositoryPrivateString = jsons:toString(responseDataFromDbJson[0].REPOSITORY_PRIVATE);
        boolean repositoryPrivate = false;

        if(repositoryPrivateString == "true"){
            repositoryPrivate = true;
        }

        condition = "WHERE ORGANIZATION_ID = '" + repositoryOrganization + "' ";
        requestDataFromDbJson =  {"tableName":"LM_ORGANIZATION","select":"ORGANIZATION_NAME","condition":condition};
        messages:setJsonPayload(requestDataFromDb,requestDataFromDbJson);
        responseDataFromDb = selectData(requestDataFromDb);
        responseDataFromDbJson = messages:getJsonPayload(responseDataFromDb);
        repositoryOrganization = jsons:toString(responseDataFromDbJson[0].ORGANIZATION_NAME);



        condition = "WHERE LICENSE_ID = '" + repositoryLicense + "' ";
        requestDataFromDbJson =  {"tableName":"LM_LICENSE","select":"LICENSE_KEY","condition":condition};
        messages:setJsonPayload(requestDataFromDb,requestDataFromDbJson);
        responseDataFromDb = selectData(requestDataFromDb);
        responseDataFromDbJson = messages:getJsonPayload(responseDataFromDb);
        repositoryLicense = jsons:toString(responseDataFromDbJson[0].LICENSE_KEY);

        string postUrl = "orgs/"+repositoryOrganization + "/repos?access_token=" + accessToken;

        json requestDataJsonForGitHubApi = {
                                               "name":repositoryName,
                                               "description":repositoryDescription,
                                               "private":repositoryPrivate,
                                               "gitignore_template":repositoryLanguage,
                                               "license_template":repositoryLicense
                                           };

        message requestMessageForGitHub = {};
        messages:setJsonPayload(requestMessageForGitHub,requestDataJsonForGitHubApi);
        http:ClientConnector httpConnector = create http:ClientConnector(gitHubApiUrl);
        message responseFromGitHubApi = httpConnector.post(postUrl,requestMessageForGitHub);

        json responseMessage = {"responseType":"Done","responseMessage":"done"};
        messages:setJsonPayload(response,responseMessage);
        return response;
    }catch(errors:Error err){
        json errorMessage = {"responseType":"Error","responseMessage":err.msg};
        system:println(err);
        messages:setJsonPayload(response,errorMessage);
        return response;
    }


    return response;
}

function getAllLanguages(message m)(message){
    message response = {};
    http:ClientConnector httpConnector = create http:ClientConnector(gitHubApiUrl);
    response = httpConnector.get("gitignore/templates",m);

    return response;
}