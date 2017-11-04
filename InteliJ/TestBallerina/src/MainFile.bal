

package src;

import ballerina.net.http;








function main (string[] args) {
    http:ClientConnector clientConnector = create
                                           http:ClientConnector("https://admin:admin@localhost:9445", getConnectorConfigs());




    http:Request req = {};
    http:Response resp = clientConnector.get("/bpmn/runtime/process-instances/", req);
    println("Response code: " + resp.getStatusCode());
    println("Response: " + resp.getStringPayload());
}
function getConnectorConfigs() (http:Options) {
    http:Options option = {
                              ssl: {
                                       keyStoreFile:"${ballerina.home}/bre/security/wso2carbon.jks",
                                       keyStorePassword:"wso2carbon",
                                       trustStoreFile:"${ballerina.home}/bre/security/client-truststore.jks",
                                       trustStorePassword:"wso2carbon"
                                   },
                              followRedirects: {}
                          };
    return option;
}


