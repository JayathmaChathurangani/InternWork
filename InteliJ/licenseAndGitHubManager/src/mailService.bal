package src;

import ballerina.net.http;
import ballerina.lang.messages;
import org.wso2.ballerina.connectors.gmail;
import ballerina.lang.system;


@http:configuration {basePath:"/mailService"}
service<http> mailService {

    @http:GET {}
    @http:Path {value:"/sendMail"}
    resource sendMail (message m) {
        message response = {};
        string clientId = "696591665753-49inll1lr69edbemnec5g5ojckskisku.apps.googleusercontent.com";
        string clientSecret = "gez-cSNi7rFjqUUXrOJzX_15";
        string userId = "webmisproject@gmail.com";
        string accessToken = "ya29.Gly4BJb_-PbuiVe1Uw_ccQiY1hUsJOCJMqTMFRb8Ry6ApQKoITO3PEEfbEB9O8UKfKAv3Squyrd3wBTbzx1wWyoQfI998cyERWBF1fqxtCiarS9wFQmMSL1R7JrS_A";
        string refreshToken = "4/FioAS7imUVoz4tyrrTyq0AKLshtoys6HFwcLic9s--w";
        gmail:ClientConnector gmailConnector = create gmail:ClientConnector(userId,accessToken,refreshToken,clientId,clientSecret);

        string to = "b.wathsala.bw@gmail.com";
        string subject = "Test Mail";
        string from = "webmisproject@gmail.com";
        string messageBody = "Hello Buddhi";
        string cc = "";
        string bcc = "";
        string id = "";
        string threadId = "";
        message gmailResponse;
        json gmailJSONResponse;

        //gmail:ClientConnector.sendMail(to,subject,from,messageBody,cc,bcc,id,threadId);
        //gmailResponse = gmail:ClientConnector.getUserProfile(gmailConnector);

        gmailResponse = gmailConnector.getUserProfile();

        //gmailResponse = gmailConnector.sendMail(to,subject,from,messageBody,cc,bcc,id,threadId);
        //gmail:

        system:println(messages:getJsonPayload(gmailResponse));
        messages:setStringPayload(response, "Hello World !!!");
        reply response;
    }
}
