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

function createGitHubRepository(int repositoryId)(json ){

    message responseDataFromDb = {};
    message requestMessageForGitHub = {};
    message responseFromGitHubApi = {};
    json response;
    json responseDataFromDbJson;
    json requestDataJsonForGitHubApi;
    string accessToken = "";
    string repositoryName;
    string repositoryLanguage;
    string repositoryDescription = " ";
    string repositoryLicense;
    string repositoryOrganization;
    string repositoryPrivateString;
    string postUrl;
    int repositoryTeam;
    boolean repositoryPrivate = false;

    try{

        accessToken = system:getEnv("GitHubToken");
        responseDataFromDb = database:repositorySelectFromId(repositoryId);
        responseDataFromDbJson = messages:getJsonPayload(responseDataFromDb);


        repositoryName = jsons:toString(responseDataFromDbJson[0].REPOSITORY_NAME);
        repositoryLanguage = jsons:toString(responseDataFromDbJson[0].REPOSITORY_LANGUAGE);
        repositoryLicense = jsons:toString(responseDataFromDbJson[0].LICENSE_KEY);
        repositoryOrganization = jsons:toString(responseDataFromDbJson[0].ORGANIZATION_NAME);
        repositoryPrivateString = jsons:toString(responseDataFromDbJson[0].REPOSITORY_PRIVATE);
        repositoryTeam,_ = <int>(jsons:toString(responseDataFromDbJson[0].REPOSITORY_TEAM));

        if(repositoryPrivateString == "true"){
            repositoryPrivate = true;
        }





        postUrl = "orgs/"+repositoryOrganization + "/repos?access_token=" + accessToken;

        requestDataJsonForGitHubApi = {
                                               "name":repositoryName,
                                               "description":repositoryDescription,
                                               "private":repositoryPrivate,
                                               "gitignore_template":repositoryLanguage,
                                               "license_template":repositoryLicense,
                                               "team_id":repositoryTeam
                                           };


        messages:setJsonPayload(requestMessageForGitHub,requestDataJsonForGitHubApi);
        http:ClientConnector httpConnector = create http:ClientConnector(gitHubApiUrl);
        responseFromGitHubApi = httpConnector.post(postUrl,requestMessageForGitHub);
        response = {"responseType":"Done","responseMessage":"done"};

    }catch(errors:Error err){
        response = {"responseType":"Error","responseMessage":err.msg};
        system:println(err);

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

    message getAdminUserMessage = database:userSelectAdminUsers();
    json getAdminUserJson = messages:getJsonPayload(getAdminUserMessage);
    string accessToken = system:getEnv("GitHubToken");
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


    message getAdminUserMessage = database:userSelectAdminUsers();
    json getAdminUserJson = messages:getJsonPayload(getAdminUserMessage);
    string accessToken = system:getEnv("GitHubToken");
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

    message getAdminUserMessage = database:userSelectAdminUsers();
    json getAdminUserJson = messages:getJsonPayload(getAdminUserMessage);
    string accessToken = system:getEnv("GitHubToken");
    string userName = jsons:toString(getAdminUserJson[0].USER_NAME);
    string userEmail = jsons:toString(getAdminUserJson[0].USER_EMAIL);
    string requestUrl =  "repos/" + organization + "/" + repositoryName + "/contents/README.md?access_token=" + accessToken + "&content=base64&branch=master";
    string encodeString = utils:base64encode(correctString(repositoryDescription));

    message gitHubRequestMessage = {};
    json gitHubRequestJson = {"message":"Add README.md","committer":{"name": userName,"email": userEmail},"content":encodeString};
    messages:setJsonPayload(gitHubRequestMessage,gitHubRequestJson);

    http:ClientConnector httpConnector = create http:ClientConnector(gitHubApiUrl);
    message response = httpConnector.put(requestUrl,gitHubRequestMessage);

    json responseMessage = {"responseType":"Done","responseMessage":"done"};
    messages:setJsonPayload(response,responseMessage);
    return response;


}

function getTeamsFromOrganization(string organization)(message ){
    message response = {};


    try{
        json responseDataFromDbJson;
        message responseDataFromDb = {};
        string accessToken = "";
        responseDataFromDb = database:userSelectAdminUsers();
        responseDataFromDbJson = messages:getJsonPayload(responseDataFromDb);
        accessToken = system:getEnv("GitHubToken");

        message requestMessageFromGitHub = {};
        string getUrl = "orgs/"+ organization + "/teams?access_token=" + accessToken;
        http:ClientConnector httpConnector = create http:ClientConnector(gitHubApiUrl);
        message responseFromGitHubApi = httpConnector.get(getUrl,requestMessageFromGitHub);

        return responseFromGitHubApi;
    }catch(errors:Error err){
        json errorMessage = {"responseType":"Error","responseMessage":err.msg};
        system:println(err);
        messages:setJsonPayload(response,errorMessage);
        return response;
    }


    return response;
}