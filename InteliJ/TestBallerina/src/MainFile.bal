

package src;

import ballerina.net.http;

function main (string[] args) {
    endpoint<http:HttpClient> httpConnector {

        create http:HttpClient("https://admin:admin@10.100.4.38:9445",{});
    }
    http:Request req = {};
    http:Response resp = {};
    resp,_ = httpConnector.get("/bpmn/runtime/tasks/", req);
    println("GET request:");
    println(resp);
}



