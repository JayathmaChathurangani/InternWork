
package src;

import ballerina.net.http;
import ballerina.lang.messages;
import ballerina.lang.system;

@http:configuration {basePath:"/hello"}
service<http> helloWorld {

    @http:Path {value:"/first/second"}
    resource sayHello (message m) {
        message response = {};
        system:println("name " + name1);


        messages:setStringPayload(response, name1);
        reply response;
    }
}
