package src.helloWorld;


import ballerina.net.http;
import ballerina.lang.messages;

service<http> helloWorld{
    resource sayHello(message m){
        message response = {};
        messages:setStringPayload(response,"Hello World Buddhi");
        reply response;
    }

    resource sayGoodBye(message m){
        message responseGoodBye = {};
        messages:setStringPayload(responseGoodBye, "Good Bye" );
        reply responseGoodBye;

    }

    resource getJSONData(message m){
        message responseJSONMessage = {};
        json responseJSON = {"name":"Buddhi","University":[1,2]};
        messages:setJsonPayload(responseJSONMessage, responseJSON);
        reply responseJSONMessage;
    }
}
