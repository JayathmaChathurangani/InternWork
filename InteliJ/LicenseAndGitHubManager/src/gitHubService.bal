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

        message input = {};

        string requestString  = messages:getStringPayload(m);
        system:println(requestString);
        json requestJson = messages:getJsonPayload(m);

        json input1 = {input:{value:2}};
        //messages:setStringPayload(response,"1");
        messages:setJsonPayload(input,input1);
        system:println(input);

        reply input;
    }

}
