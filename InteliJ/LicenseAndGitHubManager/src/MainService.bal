package src;

import ballerina.net.http;
import services;

@http:configuration {basePath:"/mainService"}
service<http> helloWorld {

    @http:POST {}
    @http:Path {value:"/createJenkinsJob"}
    resource createJenkinsJob (message m) {

        message response = services:createJenkinsJob(m);
        reply response;
    }
}
