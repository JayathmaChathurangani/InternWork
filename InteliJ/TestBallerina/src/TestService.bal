
package src;

import ballerina.net.http;
import ballerina.lang.system;


@http:configuration {basePath:"/",httpsPort: 9090, keyStoreFile: "${ballerina.home}/bre/security/wso2carbon.jks",
                     keyStorePass: "wso2carbon", certPass: "wso2carbon"}
service<http> helloWorld {

    @http:POST {}
    @http:Path {value:"/authentication/isValidUser"}
    resource sayHello (message m) {
        http:Session userSession;
        userSession = http:createSessionIfAbsent(m);
        system:println(http:getMaxInactiveInterval(userSession));

        http:setMaxInactiveInterval(userSession,100000);

        system:println(userSession);


        reply m;
    }
}
