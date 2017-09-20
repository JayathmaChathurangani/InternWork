package src;

import services;
import ballerina.net.http;
import ballerina.lang.messages;

@http:configuration {basePath:"/hello"}
service<http> helloWorld {

    @http:Path {value:"/first/second"}
    resource sayHello (message m) {
        message response = {};
        sayName("Buddhi");
        string name = services:service1("Wathsala");
        messages:setStringPayload(response, name);
        reply response;
    }
}
