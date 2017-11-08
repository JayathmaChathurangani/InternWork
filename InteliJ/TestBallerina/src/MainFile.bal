

package src;

import ballerina.net.http;

function main (string[] args) {
    endpoint<http:HttpClient> connectorEP {
         create http:HttpClient("https://10.100.4.38:9445", getConnectorConfigs());
    }
    Time time = currentTime();
    println(time);
    http:Request req = {};
    http:Response resp = {};
    req.addHeader("Authorization","Basic YWRtaW46YWRtaW4=");
    resp, _ = connectorEP.get("/bpmn/runtime/tasks/", req);
    println("Response code: " + resp.getStatusCode());
    println("Response: " + resp.getStringPayload());
}

function getConnectorConfigs() (http:Options) {
    http:Options option = {
                              ssl: {
                                       trustStoreFile:"/home/buddhik/Documents/Software/WSO2-Products/wso2ei-6.1.1/wso2/business-process/repository/resources/security/client-truststore.jks",
                                       trustStorePassword:"wso2carbon"
                                   },
                              followRedirects: {}
                          };
    return option;
}





