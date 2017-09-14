package src;

import ballerina.net.http;
import ballerina.lang.system;
import ballerina.lang.messages;


@http:configuration {basePath:"/gitHubService"}
service<http> gitHubService {

    @http:GET {}
    @http:Path {value:"/getAllLanguages"}
    resource getAllLanguages (message m) {

        message response = {};
        http:ClientConnector httpConnector = create http:ClientConnector("https://api.github.com/");
        response = httpConnector.get("gitignore/templates",m);
        system:println("calles");
        reply response;
    }


    @http:POST {}
    @http:Path {value:"/getSample"}
    resource getSample (message m) {

        message response = {};

        string requestString  = messages:getStringPayload(m);
        system:println(requestString);
        json requestJson = messages:getJsonPayload(m);
        system:println(m);
        json responseJson = {"helo":"Buddhi"};
        messages:setJsonPayload(response,responseJson);
        messages:setHeader(response,"Accept","*");
        messages:setHeader(response,"Accept-Charset","*");
        messages:setHeader(response,"Content-Type","application/json");
        messages:setHeader(response,"Content-Type","application/json");
        reply m;
    }

}
