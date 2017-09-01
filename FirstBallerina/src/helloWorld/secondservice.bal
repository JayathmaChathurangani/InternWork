package src.helloWorld;

import ballerina.net.http;
import ballerina.lang.messages;

@http:configuration {basePath:"/hello"}
service<http> HelloService {


    resource sayHello (message m) {
        message response = {};
        messages:setStringPayload(response, "Hello World !!!");
        reply response;
    }
}
