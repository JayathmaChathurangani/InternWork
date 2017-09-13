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


    @http:GET {}
    @http:Path {value:"/getSample"}
    resource getSample (message m) {

        message response = {};
        json requestJson = messages:getJsonPayload(m);
        system:println("calles : ");
        system:println(requestJson);
        reply response;
    }

}
