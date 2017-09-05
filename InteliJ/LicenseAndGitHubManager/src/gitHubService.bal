package src;

import ballerina.net.http;


@http:configuration {basePath:"/gitHubService"}
service<http> gitHubService {

    @http:GET {}
    @http:Path {value:"/getAllLanguages"}
    resource getAllLanguages (message m) {

        message response = {};
        http:ClientConnector httpConnector = create http:ClientConnector("https://api.github.com/");
        response = httpConnector.get("gitignore/templates",m);
        reply response;
    }
}
