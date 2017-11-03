

package src;

import ballerina.lang.system;
import ballerina.net.http;
import ballerina.lang.messages;
import ballerina.utils;



function main (string[] args) {
    http:ClientConnector clientConnector = create http:ClientConnector("https://localhost:9445/");
    string token = "admin:admin";
    string auth = utils:base64encode(token);
    message request = {};
    system:println("call");
    messages:setHeader(request,"Basic ",auth);
    message response = clientConnector.get("bpmn/runtime/process-instances/",request);
    system:println(response);

    //basicauth:ClientConnector basic = create basicauth:ClientConnector("https://localhost:9445/","admin","admin");
    //system:println("call");
    //message response = basic.get("bpmn/runtime/process-instances/",request);
    //system:println("cll");




}
