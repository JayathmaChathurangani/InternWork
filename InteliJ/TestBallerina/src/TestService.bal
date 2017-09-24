

import services;
import ballerina.net.http;
import ballerina.lang.messages;

@http:configuration {basePath:"/hello"}
service<http> helloWorld {

    @http:Path {value:"/first/second"}
    resource sayHello (message m) {
        message response = {};

        string name = services:service1("Wathsala");
        name = services:url;
        messages:setStringPayload(response, name);
        reply response;
    }
}
