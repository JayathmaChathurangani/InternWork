package src;

import ballerina.net.http;
import ballerina.lang.messages;
import ballerina.lang.system;
import ballerina.net.uri;
import ballerina.lang.strings;





@http:configuration {basePath:"/GitHubWorker"}
service<http> GitHubWorker{

    @http:GET {}
    @http:Path {value:"/getBugs"}

    resource getBugs(message m){
        string gitHubUserName = uri:getQueryParam(m,"gitHubUserName");
        string gitHubRepository = uri:getQueryParam(m,"gitHubRepository");
        string category = uri:getQueryParam(m,"category");
        http:ClientConnector gitHubConnector= create http:ClientConnector("https://api.github.com/repos/"+gitHubUserName+"/"+ gitHubRepository + "/"+category);

        message response = {};
        message newMessage = {};
        response = http:ClientConnector.execute(gitHubConnector, "GET", "", newMessage);

        json responseJson = messages:getJsonPayload(response);
        system:println(lengthof responseJson);
        int numberOfIssues = lengthof responseJson;
        messages:setStringPayload(response,strings:valueOf(numberOfIssues));
        reply response;

    }

    resource returnService(message m){
        message response = {};
        //json jsonMessage = messages:getJsonPayload(m);
        //string gitHubUserName = uri:getQueryParam(m,"gitHubUserName");
        //system:println(gitHubUserName);
        json jsonPayload = {"name":"Authorize"};
        messages:setJsonPayload(response,jsonPayload);
        //system:println(http:getRequestURL(m));

        reply response;
    }

    @http:GET {}
    @http:Path {value:"/getAllRepos"}

    resource getAllRepos(message m){
        string gitHubUserName = uri:getQueryParam(m,"gitHubUserName");

        http:ClientConnector gitHubConnector= create http:ClientConnector("https://api.github.com/users/" + gitHubUserName + "/repos");

        message response = {};
        message newMessage = {};
        response = http:ClientConnector.execute(gitHubConnector, "GET", "", newMessage);

        json responseJson = messages:getJsonPayload(response);

        system:println(responseJson);
        messages:setJsonPayload(response,responseJson);
        reply response;

    }}
