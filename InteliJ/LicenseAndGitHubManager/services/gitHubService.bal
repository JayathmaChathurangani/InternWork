package services;


import ballerina.lang.system;
import ballerina.lang.messages;
import ballerina.lang.errors;
import ballerina.lang.jsons;
import ballerina.net.http;
import database;
import ballerina.utils;
import ballerina.lang.files;
import ballerina.lang.blobs;


string gitHubApiUrl = "https://api.github.com/";


function createGitHubRepository(message m)(message ){
    message response = {};
    try{
        json responseDataFromDbJson;

        json requestJson = messages:getJsonPayload(m);

        message responseDataFromDb = {};
        string accessToken = "";
        int repositoryId;
        repositoryId, _ = <int>jsons:toString(requestJson.repositoryId);

        responseDataFromDb = database:userSelectAdminUsers();
        responseDataFromDbJson = messages:getJsonPayload(responseDataFromDb);
        accessToken = jsons:toString(responseDataFromDbJson[0].USER_TOKEN);


        responseDataFromDb = database:repositorySelectFromId(repositoryId);

        responseDataFromDbJson = messages:getJsonPayload(responseDataFromDb);


        string repositoryName = jsons:toString(responseDataFromDbJson[0].REPOSITORY_NAME);
        string repositoryLanguage = jsons:toString(responseDataFromDbJson[0].REPOSITORY_LANGUAGE);
        string repositoryDescription = jsons:toString(responseDataFromDbJson[0].REPOSITORY_DESCRIPTION);
        string repositoryLicense = jsons:toString(responseDataFromDbJson[0].LICENSE_KEY);
        string repositoryOrganization = jsons:toString(responseDataFromDbJson[0].ORGANIZATION_NAME);
        string repositoryPrivateString = jsons:toString(responseDataFromDbJson[0].REPOSITORY_PRIVATE);
        boolean repositoryPrivate = false;

        if(repositoryPrivateString == "true"){
            repositoryPrivate = true;
        }





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
        system:println(responseFromGitHubApi);
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

function setIssueTemplate(string organization,string repositoryName)(message){
    system:println(organization + repositoryName);
    message getAdminUserMessage = database:userSelectAdminUsers();
    json getAdminUserJson = messages:getJsonPayload(getAdminUserMessage);
    system:println(getAdminUserJson);
    string accessToken = jsons:toString(getAdminUserJson[0].USER_TOKEN);
    string userName = jsons:toString(getAdminUserJson[0].USER_NAME);
    string userEmail = jsons:toString(getAdminUserJson[0].USER_EMAIL);
    string requestUrl =  "repos/" + organization + "/" + repositoryName + "/contents/issue_template.md?access_token=" + accessToken + "&content=base64&branch=master";


    files:File issueFile = {path:"./conf/issue_template.md"};
    files:open(issueFile,"r");
    var content, _ = files:read(issueFile, 100000);
    string s = blobs:toString(content, "utf-8");
    string encodeString = utils:base64encode(s);

    message gitHubRequestMessage = {};
    json gitHubRequestJson = {"message":"Add issue template","committer":{"name": userName,"email": userEmail},"content":encodeString};
    messages:setJsonPayload(gitHubRequestMessage,gitHubRequestJson);

    http:ClientConnector httpConnector = create http:ClientConnector(gitHubApiUrl);
    message response = httpConnector.put(requestUrl,gitHubRequestMessage);
    json responseMessage = {"responseType":"Done","responseMessage":"done"};
    messages:setJsonPayload(response,responseMessage);
    return response;


}

function setPullRequestTemplate(string organization,string repositoryName)(message){
    system:println(organization + repositoryName);
    message getAdminUserMessage = database:userSelectAdminUsers();
    json getAdminUserJson = messages:getJsonPayload(getAdminUserMessage);
    system:println(getAdminUserJson);
    string accessToken = jsons:toString(getAdminUserJson[0].USER_TOKEN);
    string userName = jsons:toString(getAdminUserJson[0].USER_NAME);
    string userEmail = jsons:toString(getAdminUserJson[0].USER_EMAIL);
    string requestUrl =  "repos/" + organization + "/" + repositoryName + "/contents/pull_request_template.md?access_token=" + accessToken + "&content=base64&branch=master";


    files:File issueFile = {path:"./conf/pull_request_template.md"};
    files:open(issueFile,"r");
    var content, _ = files:read(issueFile, 100000);
    string s = blobs:toString(content, "utf-8");
    string encodeString = utils:base64encode(s);

    message gitHubRequestMessage = {};
    json gitHubRequestJson = {"message":"Add pull reaquest template","committer":{"name": userName,"email": userEmail},"content":encodeString};
    messages:setJsonPayload(gitHubRequestMessage,gitHubRequestJson);

    http:ClientConnector httpConnector = create http:ClientConnector(gitHubApiUrl);
    message response = httpConnector.put(requestUrl,gitHubRequestMessage);
    json responseMessage = {"responseType":"Done","responseMessage":"done"};
    messages:setJsonPayload(response,responseMessage);
    return response;


}

function setReadMe(string organization,string repositoryName,string repositoryDescription)(message){
    system:println(organization + repositoryName);
    message getAdminUserMessage = database:userSelectAdminUsers();
    json getAdminUserJson = messages:getJsonPayload(getAdminUserMessage);
    system:println(getAdminUserJson);
    string accessToken = jsons:toString(getAdminUserJson[0].USER_TOKEN);
    string userName = jsons:toString(getAdminUserJson[0].USER_NAME);
    string userEmail = jsons:toString(getAdminUserJson[0].USER_EMAIL);
    string requestUrl =  "repos/" + organization + "/" + repositoryName + "/contents/README.md?access_token=" + accessToken + "&content=base64&branch=master";



    string encodeString = utils:base64encode(repositoryDescription);

    message gitHubRequestMessage = {};
    json gitHubRequestJson = {"message":"Add README.md","committer":{"name": userName,"email": userEmail},"content":encodeString};
    messages:setJsonPayload(gitHubRequestMessage,gitHubRequestJson);

    http:ClientConnector httpConnector = create http:ClientConnector(gitHubApiUrl);
    message response = httpConnector.put(requestUrl,gitHubRequestMessage);
    json responseMessage = {"responseType":"Done","responseMessage":"done"};
    messages:setJsonPayload(response,responseMessage);
    return response;


}