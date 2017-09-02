
package src.helloWorld;


import org.wso2.ballerina.connectors.gmail;



function main (string[] args) {


    string clientId = "1072671897981-3gi0mlt4f7nlqdird9knbgoeoj8ulf5s.apps.googleusercontent.com";
    string clientSecret = "NcimadTUT67Xi6AZlU8D5ojw";
    string userId = "buddhik@wso2.com";
    string accessToken = "ya29.Glu5BCgLXyUejwtx3gU73n7YV8yw7lrF2stu9T7M-Tuu1rsPEn1nKxWnR1sZWTMMVxoX77NpZelTVXz_gKn0WTAAbffq8L1BpwJJFb0WY_W9m_xaDRt6Td65aQh5";
    string refreshToken = "1/yQqXYfemqis8b-zPOavGksfCJ2vaXc7kKhB4Xc_JAaw";
    gmail:ClientConnector gmailConnector = create gmail:ClientConnector(userId,accessToken,refreshToken,clientId,clientSecret);

    string to = "b.wathsala.bw@gmail.com";
    string subject = "Test Mail";
    string from = "buddhik@wso2.com";
    string messageBody = "Hello Buddhi";
    string cc = "";
    string bcc = "";
    string id = "";
    string threadId = "";
    message gmailResponse;
    json gmailJSONResponse;

    gmailResponse = gmail:ClientConnector.sendMail(gmailConnector,to,subject,from,messageBody,cc,bcc,id,threadId);
    ////gmailResponse = gmailConnector.sendMail(to,subject,from,messageBody,cc,bcc,id,threadId);

    //gmailJSONResponse = messages:getJsonPayload(gmailResponse);

    //system:println(gmailJSONResponse);
    //system:println("hello");

}
